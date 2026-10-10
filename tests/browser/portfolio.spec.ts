import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { portfolio } from "../../client/src/data/portfolio";

test("all artwork files are self-hosted and load", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".gallery-piece")).toHaveCount(
    portfolio.gallery.length,
  );
  for (const image of await page.locator(".gallery-piece img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const url = await image.getAttribute("src");
    expect(url).toMatch(/^\/artworks\//);
    const response = await request.get(url!);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }
  for (const asset of [
    "/artworks/favicon.png",
    "/robots.txt",
    "/sitemap.xml",
  ]) {
    expect((await request.get(asset)).ok()).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("gallery opens every original, zooms, browses, and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  for (const trigger of await page
    .locator(".gallery-piece .art-open-button")
    .all()) {
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator(".lightbox img")
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
      )
      .toBe(true);
    await page
      .getByRole("button", { name: "Zoom artwork", exact: true })
      .click();
    await expect(page.locator(".lightbox-image-area")).toHaveClass(/zoomed/);
    await page.getByRole("button", { name: "Fit artwork to screen" }).click();
    await page
      .getByRole("button", { name: "Next artwork", exact: true })
      .click();
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test("commission finish and inquiry follow the availability setting", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator(`.availability.is-${portfolio.commissionStatus}`),
  ).toHaveCount(2);
  for (const { name } of portfolio.pricing) {
    await page.getByRole("radio").filter({ hasText: name }).click();
    await expect(page.locator(".plan-details")).toContainText(
      name.toLowerCase(),
    );
    const href = await page
      .locator(".commission-menu .primary-button")
      .getAttribute("href");
    const decoded = decodeURIComponent(href!);
    if (portfolio.commissionStatus === "open") {
      expect(decoded).toContain(`Preferred finish: ${name}`);
    } else {
      expect(decoded).toContain("Future commission availability");
      await expect(
        page.locator(".commission-menu .primary-button"),
      ).toContainText(portfolio.statusCopy.closed.cta);
    }
  }
  await page.locator(".inquiry-details summary").click();
  await expect(page.locator(".inquiry-details pre")).toContainText(
    "Character and series",
  );
});

test("direct Terms entry and return navigation work", async ({ page }) => {
  const response = await page.goto("/terms/");
  expect(response?.ok()).toBe(true);
  await expect(page.locator(".terms-list article")).toHaveCount(
    portfolio.terms.length,
  );
  await expect(page).toHaveTitle("Commission Terms | Alex");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://alex72-py.github.io/terms",
  );
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(axe.violations).toEqual([]);
  await page
    .getByRole("link", { name: "Back to my portfolio", exact: true })
    .click();
  await expect(page.locator(".gallery-piece")).toHaveCount(
    portfolio.gallery.length,
  );
});

for (const width of [320, 390, 768, 1440]) {
  test(`responsive and accessible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(axe.violations).toEqual([]);
  });
}

test("mobile menu, full-size zoom, and not-found entry work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
  if (portfolio.gallery.length > 0) {
    await page.locator(".gallery-piece .art-open-button").first().click();
    await page
      .getByRole("button", { name: "Zoom artwork", exact: true })
      .click();
    await expect
      .poll(() =>
        page
          .locator(".lightbox-image-area")
          .evaluate((e) => e.scrollWidth > e.clientWidth),
      )
      .toBe(true);
    await page.keyboard.press("Escape");
  }
  await page.goto("/404.html");
  await expect(page.locator("h1")).toContainText("sketchbook");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test("crawler files point to the production site", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toBe(
    "User-agent: *\nAllow: /\nSitemap: https://alex72-py.github.io/sitemap.xml\n",
  );
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  expect(xml).toContain("<loc>https://alex72-py.github.io/</loc>");
  expect(xml).toContain("<loc>https://alex72-py.github.io/terms</loc>");
  expect(xml).not.toMatch(/404|manus|YOUR-/i);
});

test("an unknown URL renders the branded fallback and returns home", async ({
  page,
}) => {
  const response = await page.goto("/not-a-real-page-check");
  if (process.env.TEST_BASE_URL) expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("sketchbook");
  await expect(page).toHaveTitle("Page Not Found | Alex");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  await page
    .getByRole("link", { name: "Back to my portfolio", exact: true })
    .click();
  await expect(page.locator(".gallery-piece")).toHaveCount(
    portfolio.gallery.length,
  );
});
