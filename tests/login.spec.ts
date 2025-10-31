import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { getEnvironmentConfig } from '../config/environment.config';
import { testData } from '../config/test-data.config';
import { Logger } from '../src/utils/logger';

test.describe('Login Page Tests - Page Object Model Demo', () => {
  let loginPage: LoginPage;
  const envConfig = getEnvironmentConfig();

  test.beforeEach(async ({ page }) => {
    Logger.info(`Testing login on environment: ${process.env.ENV || 'dev'}`);
    loginPage = new LoginPage(page);
  });

  test('should display login form elements', async ({ page }) => {
    Logger.step(1, 'Navigate to login page');
    await loginPage.open(envConfig.baseURL);
    
    Logger.step(2, 'Verify login page elements are visible');
    await loginPage.verifyLoginPageLoaded();
    
    Logger.info('Login page loaded successfully with all required elements');
  });

  test('should handle login attempt', async ({ page }) => {
    Logger.step(1, 'Navigate to login page');
    await loginPage.open(envConfig.baseURL);
    
    Logger.step(2, 'Enter credentials and submit');
    await loginPage.login(
      testData.validCredentials.username,
      testData.validCredentials.password
    );
    
    Logger.step(3, 'Wait for navigation or error');
    await page.waitForTimeout(2000);
    
    const currentURL = await loginPage.getCurrentURL();
    Logger.info(`Current URL after login attempt: ${currentURL}`);
  });

  test('should be able to interact with remember me checkbox', async ({ page }) => {
    Logger.step(1, 'Navigate to login page');
    await loginPage.open(envConfig.baseURL);
    
    Logger.step(2, 'Login with remember me option');
    await loginPage.loginWithRememberMe(
      envConfig.users.standard.username,
      envConfig.users.standard.password
    );
    
    await page.waitForTimeout(2000);
    Logger.info('Login with remember me completed');
  });
});
