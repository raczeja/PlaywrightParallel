import { chromium, FullConfig } from "@playwright/test";
import { getEnvironmentConfig } from "./config/environment.config";

async function globalSetup(config: FullConfig) {
  const env = process.env.ENV || "dev";
  const envConfig = getEnvironmentConfig(env);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to login page and attempt UI login to capture storage state.
    await page.goto(envConfig.baseURL + "/login");

    // Try common selectors for username/password/button
    const usernameSelector = 'input[name="username"], input[type="email"]';
    const passwordSelector = 'input[name="password"], input[type="password"]';
    const submitSelector = 'button[type="submit"], button:has-text("Login")';

    await page
      .fill(usernameSelector, envConfig.users.standard.username)
      .catch(() => {});
    await page
      .fill(passwordSelector, envConfig.users.standard.password)
      .catch(() => {});
    await Promise.all([
      page
        .waitForNavigation({ waitUntil: "networkidle", timeout: 10000 })
        .catch(() => {}),
      page.click(submitSelector).catch(() => {}),
    ]);

    // Optionally wait for an element that indicates successful login
    // This is application specific; keep it permissive
    await page.waitForLoadState("networkidle");

    // Save storage state for use in tests
    await page.context().storageState({ path: "storageState.json" });
  } catch (err: any) {
    // If login fails, still attempt to save current state (may be unauthenticated)
    console.warn(
      "global-setup: login attempt failed or not applicable:",
      err?.message ?? err
    );
    try {
      await page.context().storageState({ path: "storageState.json" });
    } catch (e: any) {
      console.warn(
        "global-setup: failed to save storageState:",
        e?.message ?? e
      );
    }
  } finally {
    await browser.close();
  }
}

export default globalSetup;
