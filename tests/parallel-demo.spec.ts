import { test, expect } from "@playwright/test";
import { Logger } from "../src/utils/logger";
import { getRandomNumber } from "../src/utils/helpers";

test.describe("Sequential Execution Demo - Tests in Same File", () => {
  test("test 1 - should complete first", async ({ page }) => {
    Logger.info("Starting test 1 (runs sequentially within this file)");
    await page.goto("https://demo.playwright.dev");
    const title = await page.title();
    expect(title).toBeTruthy();
    Logger.info(`Test 1 completed with title: ${title}`);
  });

  test("test 2 - should run after test 1", async ({ page }) => {
    Logger.info("Starting test 2 (runs after test 1)");
    await page.goto("https://demo.playwright.dev");
    const heading = await page.locator("h1").first().textContent();
    expect(heading).toBeTruthy();
    Logger.info(`Test 2 completed with heading: ${heading}`);
  });

  test("test 3 - should run after test 2", async ({ page }) => {
    Logger.info("Starting test 3 (runs after test 2)");
    await page.goto("https://demo.playwright.dev");
    await page.waitForLoadState("networkidle");
    const url = page.url();
    expect(url).toContain("playwright");
    Logger.info(`Test 3 completed with URL: ${url}`);
  });

  test("test 4 - should run after test 3", async ({ page }) => {
    Logger.info("Starting test 4 (runs after test 3)");
    await page.goto("https://demo.playwright.dev");
    const content = await page.content();
    expect(content.length).toBeGreaterThan(0);
    Logger.info("Test 4 completed");
  });

  test("test 5 - should run last", async ({ page }) => {
    Logger.info("Starting test 5 (runs last in this file)");
    await page.goto("https://demo.playwright.dev");
    const screenshot = await page.screenshot();
    expect(screenshot).toBeTruthy();
    Logger.info("Test 5 completed with screenshot");
  });
});

test.describe("Serial Mode Example - Explicit Configuration", () => {
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
