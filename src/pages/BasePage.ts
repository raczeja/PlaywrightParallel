import { Page, Locator, expect, TestInfo } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for the page to finish loading.
   * First try 'networkidle' which is best for single-page apps, but fall back
   * to 'load' if 'networkidle' times out (some pages keep long-running
   * connections and never reach 'networkidle').
   */
  async waitForPageLoad(timeout: number = 30000): Promise<void> {
    try {
      await this.page.waitForLoadState('networkidle', { timeout });
    } catch (err) {
      // Fallback: wait for 'load' which is less strict and avoids flaky timeouts
      // on pages with polling/websockets/analytics.
      // eslint-disable-next-line no-console
      console.warn('waitForPageLoad: networkidle timed out, falling back to load');
      await this.page.waitForLoadState('load', { timeout: Math.max(5000, timeout / 6) });
    }
  }

  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fillInput(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Take a screenshot and either attach it to the Playwright TestInfo (recommended)
   * or save it to a unique file (fallback). Using TestInfo avoids collisions when
   * running tests in parallel and attaches artifacts to the HTML report.
   */
  /**
   * Require TestInfo so screenshots are attached to the test report.
   */
  async screenshot(name: string, testInfo: TestInfo): Promise<void> {
    const buffer = await this.page.screenshot({ fullPage: true });
    try {
      await testInfo.attach(name, { body: buffer, contentType: 'image/png' });
    } catch (err: any) {
      // Fallback: save to output folder with unique name to avoid collisions.
      const timestamp = Date.now();
      const pid = process.pid;
      const filename = `test-results/screenshot-${name}-${pid}-${timestamp}.png`;
      await this.page.screenshot({ path: filename, fullPage: true });
    }
  }

  async verifyElementText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async verifyElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async selectDropdownOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  async checkCheckbox(locator: Locator): Promise<void> {
    try {
      const count = await locator.count();
      if (count === 0) {
        // Element not present on the page (e.g., some apps don't have 'remember me')
        return;
      }

      if (!(await locator.isChecked())) {
        await locator.check();
      }
    } catch (err: any) {
      // If anything goes wrong interacting with the checkbox, skip silently to
      // avoid failing tests on optional UI elements. Tests that require the
      // checkbox should assert its presence explicitly.
      // eslint-disable-next-line no-console
      console.warn('checkCheckbox: could not interact with locator', err?.message ?? err);
    }
  }

  async uncheckCheckbox(locator: Locator): Promise<void> {
    try {
      const count = await locator.count();
      if (count === 0) return;
      if (await locator.isChecked()) {
        await locator.uncheck();
      }
    } catch (err: any) {
      // silent fallback for optional checkbox
      // eslint-disable-next-line no-console
      console.warn('uncheckCheckbox: could not interact with locator', err?.message ?? err);
    }
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  async waitForTimeout(timeout: number): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }
}
