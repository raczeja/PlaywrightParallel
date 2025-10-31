import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"], input[type="email"]').first();
    this.passwordInput = page.locator('input[name="password"], input[type="password"]').first();
    this.loginButton = page.locator('button[type="submit"], button:has-text("Login")').first();
    this.errorMessage = page.locator('.error, .alert-danger, [role="alert"]').first();
    this.forgotPasswordLink = page.locator('text=Forgot password').first();
    this.rememberMeCheckbox = page.locator('input[type="checkbox"][name="remember"]').first();
  }

  async open(baseURL: string): Promise<void> {
    await this.navigateTo(`${baseURL}/login`);
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async loginWithRememberMe(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.checkCheckbox(this.rememberMeCheckbox);
    await this.clickElement(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  async clickForgotPassword(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
  }

  async verifyLoginPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.usernameInput);
    await this.verifyElementVisible(this.passwordInput);
    await this.verifyElementVisible(this.loginButton);
  }
}
