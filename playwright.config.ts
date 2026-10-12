import { defineConfig, devices } from "@playwright/test";
const previewPort = Number(process.env.PLAYWRIGHT_PORT || 3007);
const previewUrl = `http://127.0.0.1:${previewPort}`;
export default defineConfig({
  testDir: "./tests/browser", fullyParallel: false, workers: 1,
  timeout: 45000, expect: { timeout: 7000 },
  use: { baseURL: previewUrl, trace: "retain-on-failure", screenshot: "only-on-failure", channel: "chrome" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
  ],
  webServer: { command: `npm run start -- -p ${previewPort}`, url: previewUrl, reuseExistingServer: !process.env.CI, timeout: 60000 },
});
