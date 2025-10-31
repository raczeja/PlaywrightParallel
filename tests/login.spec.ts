import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { getEnvironmentConfig } from "../config/environment.config";
import { testData } from "../config/test-data.config";
import { Logger } from "../src/utils/logger";

test.describe("Login Page Tests - Page Object Model Demo", () => {
  let loginPage: LoginPage;
  const envConfig = getEnvironmentConfig();

  test.beforeEach(async ({ page }) => {
    Logger.info(`Testing login on environment: ${process.env.ENV || "dev"}`);
    loginPage = new LoginPage(page);
  });

  test("should display login form elements", async ({ page }) => {
    Logger.step(1, "Navigate to login page");
    await loginPage.open();

    Logger.step(2, "Verify login page elements are visible");
    await loginPage.verifyLoginPageLoaded();

    Logger.info("Login page loaded successfully with all required elements");
  });

  test("should handle login attempt", async ({ page }) => {
    Logger.step(1, "Navigate to login page");
    await loginPage.open();

    Logger.step(2, "Enter credentials and submit");
    // Perform login and wait for possible navigation that indicates success.
    await Promise.all([
      page
        .waitForNavigation({ waitUntil: "networkidle", timeout: 10000 })
        .catch(() => {}),
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      ),
    ]);

    const currentURL = await loginPage.getCurrentURL();
    Logger.info(`Current URL after login attempt: ${currentURL}`);
  });

  test("should be able to interact with remember me checkbox", async ({
    page,
  }) => {
    Logger.step(1, "Navigate to login page");
    await loginPage.open();

    Logger.step(2, "Login with remember me option");
    await Promise.all([
      page
        .waitForNavigation({ waitUntil: "networkidle", timeout: 10000 })
        .catch(() => {}),
      loginPage.loginWithRememberMe(
        envConfig.users.standard.username,
        envConfig.users.standard.password
      ),
    ]);

    Logger.info("Login with remember me completed");
  });
});
