import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { getEnvironmentConfig } from '../config/environment.config';
import { Logger } from '../src/utils/logger';

test.describe('Home Page Tests - Parallel Execution Demo', () => {
  let homePage: HomePage;
  const demoURL = 'https://demo.playwright.dev';

  test.beforeEach(async ({ page }) => {
    Logger.info(`Running test on environment: ${process.env.ENV || 'dev'}`);
    homePage = new HomePage(page);
    await homePage.open(demoURL);
  });

  test('should display the home page title', async () => {
    Logger.step(1, 'Verify page title is displayed');
    const title = await homePage.getTitle();
    expect(title).toBeTruthy();
    Logger.info(`Page title: ${title}`);
  });

  test('should display heading on the page', async () => {
    Logger.step(1, 'Get heading text from the page');
    const heading = await homePage.getHeadingText();
    expect(heading).toBeTruthy();
    Logger.info(`Heading text: ${heading}`);
  });

  test('should verify navigation is visible', async () => {
    Logger.step(1, 'Check if navigation menu is visible');
    const isVisible = await homePage.isNavigationVisible();
    expect(isVisible).toBeTruthy();
    Logger.info('Navigation menu is visible');
  });

  test('should load page successfully', async () => {
    Logger.step(1, 'Verify page loads without errors');
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toContain(demoURL);
    Logger.info(`Current URL: ${currentURL}`);
  });
});
