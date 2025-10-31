import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly heading: Locator;
  private readonly getStartedButton: Locator;
  private readonly searchInput: Locator;
  private readonly navigationMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1');
    this.getStartedButton = page.locator('text=Get started');
    this.searchInput = page.locator('input[type="search"]');
    this.navigationMenu = page.locator('nav');
  }

  async open(baseURL: string): Promise<void> {
    await this.navigateTo(baseURL);
    await this.waitForPageLoad();
  }

  async getHeadingText(): Promise<string> {
    return await this.getText(this.heading);
  }

  async isGetStartedButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.getStartedButton);
  }

  async clickGetStarted(): Promise<void> {
    await this.clickElement(this.getStartedButton);
  }

  async search(query: string): Promise<void> {
    await this.fillInput(this.searchInput, query);
    await this.pressKey('Enter');
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    const title = await this.getTitle();
    if (!title.includes(expectedTitle)) {
      throw new Error(`Expected title to contain "${expectedTitle}" but got "${title}"`);
    }
  }

  async isNavigationVisible(): Promise<boolean> {
    return await this.isElementVisible(this.navigationMenu);
  }
}
