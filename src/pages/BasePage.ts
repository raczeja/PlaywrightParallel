import { Page, Locator, expect } from '@playwright/test';

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

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fillInput(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
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
    if (!await locator.isChecked()) {
      await locator.check();
    }
  }

  async uncheckCheckbox(locator: Locator): Promise<void> {
    if (await locator.isChecked()) {
      await locator.uncheck();
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
