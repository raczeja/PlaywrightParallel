import { defineConfig, devices } from '@playwright/test';
import { getEnvironmentConfig } from './config/environment.config';

const env = process.env.ENV || 'dev';
const envConfig = getEnvironmentConfig(env);

export default defineConfig({
  testDir: './tests',
  
  fullyParallel: true,
  
  workers: process.env.CI ? 2 : 4,
  
  retries: process.env.CI ? 2 : 0,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
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

  timeout: 60000,
  expect: {
    timeout: 10000
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },
  ],

  outputDir: 'test-results',
});
