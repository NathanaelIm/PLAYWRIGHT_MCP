import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const VALID_CREDENTIALS = {
  personalNumber: '90145697',
  password: '90145697',
  captcha: 'test aja',
};

const INVALID_CREDENTIALS = {
  personalNumber: '00000000',
  password: 'wrongpassword123',
  captcha: 'test aja',
};

test.describe('Login Feature - Procash', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.verifyPageLoaded();
  });

  test('TC-01: Successful Login with Valid Credentials and Injected Captcha', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      VALID_CREDENTIALS.personalNumber,
      VALID_CREDENTIALS.password,
      VALID_CREDENTIALS.captcha,
    );

    await loginPage.verifyLoginSuccess();
    await loginPage.dismissSuccessDialog();
  });

  test('TC-02: Login Fails with Invalid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      INVALID_CREDENTIALS.personalNumber,
      INVALID_CREDENTIALS.password,
      INVALID_CREDENTIALS.captcha,
    );

    await loginPage.verifyStillOnLoginPage();
  });

  test('TC-03: Login Fails When Required Fields Are Empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.verifyFieldsEmpty();
    await loginPage.clickSignIn();
    await loginPage.verifyStillOnLoginPage();
  });

});