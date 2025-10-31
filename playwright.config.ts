import { defineConfig, devices } from '@playwright/test';
import { getEnvironmentConfig } from './config/environment.config';

const env = process.env.ENV || 'dev';
const envConfig = getEnvironmentConfig(env);

export default defineConfig({
  testDir: './tests',

  // fullyParallel: false means tests in the same file run sequentially,
  // while different spec files run in parallel across workers
  fullyParallel: false,

  // Let Playwright pick optimal worker count locally; constrain in CI.
  workers: process.env.CI ? 2 : undefined,

  // Prevent committing test.only in CI
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: envConfig.baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  // Run global setup to create storageState.json (pre-auth) if possible
  globalSetup: require.resolve('./global-setup'),

  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  outputDir: 'test-results',
});
