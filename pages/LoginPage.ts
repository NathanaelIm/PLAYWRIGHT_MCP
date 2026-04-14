import { type Page, type Locator, expect } from '@playwright/test';

const LOGIN_URL = 'http://172.24.169.172/loyalty/auth-login';

export class LoginPage {
  readonly page: Page;

  // Locators
  readonly heading: Locator;
  readonly personalNumberInput: Locator;
  readonly passwordInput: Locator;
  readonly captchaInput: Locator;
  readonly signInButton: Locator;
  readonly successDialog: Locator;
  readonly successDialogOkButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading            = page.getByRole('heading', { name: 'Sign In' });
    this.personalNumberInput = page.getByPlaceholder('Personal Number');
    this.passwordInput       = page.getByRole('textbox', { name: 'Password' });
    this.captchaInput        = page.getByRole('textbox', { name: 'Enter Captcha' });
    this.signInButton        = page.getByRole('button', { name: 'Sign In ' });
    this.successDialog       = page.getByRole('dialog', { name: 'Login Success' });
    this.successDialogOkButton = page.getByRole('button', { name: 'OK' });
  }

  // Actions
  async navigate() {
    await this.page.goto(LOGIN_URL);
  }

  async fillPersonalNumber(value: string) {
    await this.personalNumberInput.click();
    await this.personalNumberInput.fill(value);
  }

  async fillPassword(value: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(value);
  }

  async fillCaptcha(value: string) {
    await this.captchaInput.click();
    await this.captchaInput.fill(value);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async dismissSuccessDialog() {
    await this.successDialogOkButton.click();
  }

  async login(personalNumber: string, password: string, captcha: string) {
    await this.fillPersonalNumber(personalNumber);
    await this.fillPassword(password);
    await this.fillCaptcha(captcha);
    await this.clickSignIn();
  }

  // Assertions
  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.personalNumberInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.captchaInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async verifyFieldsEmpty() {
    await expect(this.personalNumberInput).toHaveValue('');
    await expect(this.passwordInput).toHaveValue('');
    await expect(this.captchaInput).toHaveValue('');
  }

  async verifyLoginSuccess() {
    await expect(this.successDialog).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Login Success' })).toBeVisible();
    await expect(this.page.getByText('Successful, Welcome')).toBeVisible();
  }

  async verifyStillOnLoginPage() {
    await expect(this.page).toHaveURL(LOGIN_URL);
  }
}
