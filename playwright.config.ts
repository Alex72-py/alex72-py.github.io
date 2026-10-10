import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  timeout: 30_000,
  workers: 1,
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:4175",
    headless: true,
  },
  webServer: process.env.TEST_BASE_URL
    ? undefined
    : {
        command: "pnpm preview --port 4175 --strictPort",
        url: "http://127.0.0.1:4175",
        reuseExistingServer: !process.env.CI,
      },
});
