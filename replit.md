# Playwright Test Framework

## Overview
This is a comprehensive Playwright test automation framework built with TypeScript. It demonstrates best practices for test automation including parallel execution, multi-environment configuration, and the Page Object Model design pattern.

## Purpose
- Provide a production-ready test automation framework
- Demonstrate parallel test execution capabilities
- Show proper implementation of Page Object Model pattern
- Support testing across multiple environments (dev, staging, production)

## Project Structure
- `config/` - Environment and test data configuration
- `src/pages/` - Page Object Model classes
- `src/utils/` - Utility functions and helpers
- `tests/` - Test suites organized by feature
- `playwright.config.ts` - Main Playwright configuration
- `tsconfig.json` - TypeScript compiler configuration

## Key Features
1. **Parallel Test Execution**: Tests run simultaneously across 4 workers by default
2. **Multi-Environment Support**: Switch between dev/staging/prod with a single command
3. **Page Object Pattern**: Clean separation of test logic and page interactions
4. **Type Safety**: Full TypeScript implementation
5. **Rich Reporting**: HTML reports with screenshots and videos on failure

## Recent Changes
- Initial framework setup completed (October 31, 2025)
- Configured parallel execution with 4 workers
- Implemented base page object with common methods
- Created sample page objects (HomePage, LoginPage)
- Added environment configuration for dev/staging/prod
- Created example test suites demonstrating parallel execution

## How to Run
- `npm test` - Run all tests on dev environment
- `npm run test:staging` - Run tests on staging
- `npm run test:prod` - Run tests on production
- `npm run test:headed` - Run with visible browser
- `npm run report` - View HTML test report

## Architecture
The framework follows these patterns:
- **Page Object Model**: Each page has a corresponding class with methods
- **Base Page Pattern**: Common functionality in BasePage class
- **Environment Abstraction**: Configuration separated from test code
- **Parallel Execution**: Tests run independently without shared state

## Dependencies
- @playwright/test - Test framework
- TypeScript - Type safety and modern JavaScript features
- dotenv - Environment variable management
- prettier - Code formatting
