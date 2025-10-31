import { test as baseTest } from "@playwright/test";
import { getEnvironmentConfig } from "../config/environment.config";

type LoginHelper = (user?: "standard" | "admin") => Promise<void>;

const envConfig = getEnvironmentConfig();

export const test = baseTest.extend<{ loginAs: LoginHelper }>({
  loginAs: async ({ page }, use) => {
    await use(async (user: "standard" | "admin" = "standard") => {
      // Simple UI login helper; tests can call await loginAs()
      await page.goto("/login");
      const usernameSelector = 'input[name="username"], input[type="email"]';
      const passwordSelector = 'input[name="password"], input[type="password"]';
      const submitSelector = 'button[type="submit"], button:has-text("Login")';

      await page
        .fill(usernameSelector, envConfig.users[user].username)
        .catch(() => {});
      await page
        .fill(passwordSelector, envConfig.users[user].password)
        .catch(() => {});
      await Promise.all([
        page
          .waitForNavigation({ waitUntil: "networkidle", timeout: 10000 })
          .catch(() => {}),
        page.click(submitSelector).catch(() => {}),
      ]);
    });
  },
});

export const expect = test.expect;
