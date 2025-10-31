import { test, expect } from "@playwright/test";
import { Logger } from "../src/utils/logger";
import { getRandomNumber } from "../src/utils/helpers";

test.describe("Parallel Execution Demo - Independent Tests", () => {
  test("parallel test 1 - should complete quickly", async ({ page }) => {
    Logger.info("Starting parallel test 1");
    // Use Playwright baseURL from config
    await page.goto("/");
    const title = await page.title();
    expect(title).toBeTruthy();
    Logger.info(`Test 1 completed with title: ${title}`);
  });

  test("parallel test 2 - should run simultaneously", async ({ page }) => {
    Logger.info("Starting parallel test 2");
    await page.goto("/");
    const heading = await page.locator("h1").first().textContent();
    expect(heading).toBeTruthy();
    Logger.info(`Test 2 completed with heading: ${heading}`);
  });

  test("parallel test 3 - independent execution", async ({ page }) => {
    Logger.info("Starting parallel test 3");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toContain("playwright");
    Logger.info(`Test 3 completed with URL: ${url}`);
  });

  test("parallel test 4 - concurrent test run", async ({ page }) => {
    Logger.info("Starting parallel test 4");
    // Avoid arbitrary waits; navigate and assert page content
    await page.goto("/");
    const content = await page.content();
    expect(content.length).toBeGreaterThan(0);
    Logger.info("Test 4 completed");
  });

  test("parallel test 5 - multi-worker support", async ({ page }) => {
    Logger.info("Starting parallel test 5");
    await page.goto("/");
    const screenshot = await page.screenshot();
    expect(screenshot).toBeTruthy();
    Logger.info("Test 5 completed with screenshot");
  });
});

test.describe("Sequential Tests - With Dependencies", () => {
  test.describe.configure({ mode: "serial" });

  let sharedData: string;

  test("sequential test 1 - setup data", async ({ page }) => {
    Logger.info("Running sequential test 1");
    await page.goto("https://demo.playwright.dev");
    sharedData = await page.title();
    expect(sharedData).toBeTruthy();
    Logger.info(`Sequential test 1 set data: ${sharedData}`);
  });

  test("sequential test 2 - use shared data", async ({ page }) => {
    Logger.info("Running sequential test 2");
    expect(sharedData).toBeTruthy();
    await page.goto("https://demo.playwright.dev");
    Logger.info(`Sequential test 2 used data: ${sharedData}`);
  });
});
