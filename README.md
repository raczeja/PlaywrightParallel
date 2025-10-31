# Playwright Test Framework with TypeScript

A comprehensive test automation framework built with Playwright and TypeScript, featuring parallel test execution, multi-environment configuration, and the Page Object Model pattern.

## Features

- **TypeScript Support**: Full TypeScript implementation with type safety
- **Parallel Execution**: Tests run in parallel across multiple workers for faster execution
- **Multi-Environment Support**: Easy configuration for dev, staging, and production environments
- **Page Object Model**: Clean, maintainable test code using POM design pattern
- **Browser Support**: Configured for Chromium by default (easily extensible to Firefox, WebKit, and mobile browsers)
- **Rich Reporting**: HTML reports, JSON output, and console reporting
- **Reusable Utilities**: Helper functions and logging utilities

## Project Structure

```
playwright-test-framework/
├── config/
│   ├── environment.config.ts    # Environment-specific configurations
│   └── test-data.config.ts      # Test data management
├── src/
│   ├── pages/
│   │   ├── BasePage.ts          # Base page class with common methods
│   │   ├── HomePage.ts          # Home page object
│   │   └── LoginPage.ts         # Login page object
│   └── utils/
│       ├── helpers.ts           # Utility helper functions
│       └── logger.ts            # Logging utility
├── tests/
│   ├── example.spec.ts          # Example test suite
│   ├── login.spec.ts            # Login test suite
│   └── parallel-demo.spec.ts   # Parallel execution demo
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Running Tests

### Run all tests (default: dev environment)
```bash
npm test
```

### Run tests on specific environment
```bash
npm run test:dev       # Development environment
npm run test:staging   # Staging environment
npm run test:prod      # Production environment
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Debug tests
```bash
npm run test:debug
```

### View test report
```bash
npm run report
```

## Configuration

### Environment Configuration

Edit `config/environment.config.ts` to configure different environments:

```typescript
const environments = {
  dev: {
    baseURL: 'https://dev.example.com',
    apiURL: 'https://dev.example.com/api',
    timeout: 30000,
    retries: 1,
    users: { ... }
  },
  // staging, prod...
}
```

### Playwright Configuration

The `playwright.config.ts` file controls:
- **Parallel Workers**: Set to 4 workers by default (2 in CI)
- **Retries**: Automatic retry on failure
- **Browser Projects**: Chromium configured by default (easily add Firefox, WebKit, Mobile)
- **Reporting**: HTML, List, and JSON reporters
- **Screenshots & Videos**: Captured on failure

To add more browsers, edit `playwright.config.ts` and add additional projects:
```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
],
```

## Parallel Execution

The framework is configured to run tests in parallel **between different spec files**, while tests **within the same spec file run sequentially**. This is controlled in `playwright.config.ts`:

```typescript
fullyParallel: false,  // Tests in same file run sequentially
workers: process.env.CI ? 2 : 4,  // Number of parallel workers for different files
```

**How it works:**
- **Different spec files** (e.g., `example.spec.ts`, `login.spec.ts`, `parallel-demo.spec.ts`) run in parallel across 4 workers
- **Tests within the same file** run one after another (sequentially)

This approach is useful when:
- Tests in a file share setup/teardown logic
- Tests in a file have dependencies on each other
- You want to avoid race conditions within a test suite

To run all tests in parallel (even within the same file), change `fullyParallel: true` in the config.

## Page Object Model

### Creating a New Page Object

1. Extend `BasePage`:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  private readonly element: Locator;

  constructor(page: Page) {
    super(page);
    this.element = page.locator('#my-element');
  }

  async doSomething(): Promise<void> {
    await this.clickElement(this.element);
  }
}
```

2. Use in tests:

```typescript
import { MyPage } from '../src/pages/MyPage';

test('my test', async ({ page }) => {
  const myPage = new MyPage(page);
  await myPage.doSomething();
});
```

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { Logger } from '../src/utils/logger';

test.describe('My Test Suite', () => {
  test('should do something', async ({ page }) => {
    Logger.step(1, 'Navigate to page');
    const homePage = new HomePage(page);
    await homePage.open('https://example.com');
    
    Logger.step(2, 'Verify something');
    const title = await homePage.getTitle();
    expect(title).toContain('Expected');
  });
});
```

## Utilities

### Logger

```typescript
import { Logger } from '../src/utils/logger';

Logger.info('Information message');
Logger.error('Error message');
Logger.warn('Warning message');
Logger.step(1, 'Step description');
```

### Helpers

```typescript
import { getRandomString, wait } from '../src/utils/helpers';

const randomStr = getRandomString(10);
await wait(1000);
```

## Best Practices

1. **Use Page Objects**: Keep test logic separate from page interactions
2. **Parallel-Safe Tests**: Ensure tests are independent and don't share state
3. **Use Logger**: Log important steps for better debugging
4. **Environment Config**: Use environment config for URLs and credentials
5. **Descriptive Names**: Use clear, descriptive names for tests and methods
6. **Wait Strategies**: Use proper wait strategies instead of hard waits

## Troubleshooting

### Tests failing in parallel
- Ensure tests are independent
- Check for shared state or resources
- Use test isolation features

### Browser not found
```bash
npx playwright install chromium
```

### Slow test execution
- Reduce workers in `playwright.config.ts`
- Optimize page object methods
- Use proper wait strategies

## Reports

After running tests, view the HTML report:

```bash
npm run report
```

Reports are generated in the `playwright-report/` directory.

## License

MIT
