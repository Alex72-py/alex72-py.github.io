# Alex’s anime artwork portfolio

Public site: **https://alex72-py.github.io/**

A static React/Vite portfolio for my traditional anime fanart. GitHub Actions checks, builds, tests, and publishes commits on `main`. No database, payment checkout, public editing endpoint, or Manus storage dependency is required.

## Close or reopen commissions

Open [`client/src/data/portfolio.ts`](client/src/data/portfolio.ts), click the pencil/edit control, and change:

```ts
commissionStatus: "open" as CommissionStatus,
```

to `"closed"`. Click **Commit changes** and wait for the [deployment workflow](https://github.com/Alex72-py/alex72-py.github.io/actions) to succeed. The header, hero, contact copy, browser title, and inquiry CTA update together. Use `"open"` to reopen.

Commits to GitHub update this GitHub Pages site. They do not update the separate Manus-hosted version automatically.

## Add a drawing

Upload images into [`artworks/`](artworks/) with GitHub’s **Add file → Upload files** control. Keep filenames simple. A smaller WebP image is suitable for the gallery; a larger JPG/PNG can be used for the viewer. Then edit the `gallery` array in the same content file:

```ts
{
  id: "unique-drawing-id",
  title: "Your artwork title",
  character: "Character name",
  shortName: "Short display name",
  series: "Anime series",
  image: "/artworks/new-drawing.webp",
  fullImage: "/artworks/new-drawing.jpg",
  width: 900,
  height: 1300,
  alt: "A clear description of the actual drawing.",
},
```

Use real filenames and dimensions, not the illustrative example values. Each ID must be unique. The build checks that referenced files exist; it refuses to publish missing files or invalid entries.

## Remove, replace, or reorder a drawing

Remove its entry from `gallery` to remove it from the current website. Delete the unused image files separately if desired. Deleting only a file while leaving its entry makes the build fail rather than publishing a broken image.

Replace an entry’s image paths, description, and dimensions to update a drawing. A new filename helps avoid old cached images. Reorder entries to reorder the gallery.

`featuredArtworkIds: ["ai", "aqua"]` chooses the hero drawings by ID. The hero safely falls back if a featured piece is removed, and also handles one or zero gallery pieces. Gallery reordering does not change your chosen hero drawings.

Removal from the current site does not erase Git history, downloaded files, or copies already made by others. The gallery renders publicly, so visitors can save displayed images.

## Other edits

The same `portfolio.ts` file holds prices, commission rules, flexible timing, process, email/Discord, and socials. Blank Instagram and X links remain hidden until populated. The commission terms are at `/terms`.

Do not put passwords, private keys, wallet secrets, or access tokens in this repository. This repository is public. Only accounts with repository write access can change the source; viewing or forking it does not grant that access. Keep write access limited to the owner and protect the account with a passkey or two-factor authentication.

There is no upload dashboard on the public website. Owner editing currently uses GitHub’s authenticated file editor.

## Local development

Use Node 22 and pnpm 10.4.1:

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

The production build is in `dist/`. `scripts/finalize-build.mjs` packages the root-level artwork folder, generates the sitemap/robots files, and creates real `/terms/index.html` and `/404.html` entries. The root Pages URL requires Vite’s `base: "/"`.

On GitHub, **Settings → Pages → Source** should be **GitHub Actions**. A successful workflow publishes the current `main` commit. To undo an unwanted content change, revert that commit; do not delete the repository.

## Ownership and third-party components

All supplied drawings are Alex’s work; the depicted anime characters belong to their respective rights holders. Public availability is not permission to redistribute or commercially reuse the artwork. The personal-use commission terms remain on the site.

The small pointer-driven hero tilt is adapted from React Bits. Its license and attribution are preserved in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) and `licenses/`. No license covering the entire artwork collection is implied by this repository’s visibility.

GitHub Pages’ published usage policy restricts sites primarily intended for commercial transactions. This portfolio was published at the owner’s explicit request after explaining that limitation; technical deployment does not constitute eligibility approval by GitHub.
