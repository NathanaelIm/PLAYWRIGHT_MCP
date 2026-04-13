// spec: specs/testLogin.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login Tests', () => {

  test('Successful Login - Standard User', async ({ page }) => {
    // Navigate to SauceDemo login page for successful login test
    await page.goto('https://www.saucedemo.com/');

    // Verify login page elements are visible
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    // Enter standard_user for successful login test
    await page.locator('[data-test="username"]').fill('standard_user');

    // Enter correct password for successful login
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Complete successful login and verify redirect to inventory page
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login - user is redirected to inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('Failed Login - Locked Out User', async ({ page }) => {
    // Navigate back to login page for locked out user test
    await page.goto('https://www.saucedemo.com/');

    // Enter locked_out_user to test locked account error
    await page.locator('[data-test="username"]').fill('locked_out_user');

    // Enter password for locked out user test
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Test locked out user error message appears
    await page.locator('[data-test="login-button"]').click();

    // Verify error message appears
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');

    // Verify user remains on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Close the locked out error message
    await page.locator('[data-test="error-button"]').click();

    // Verify error message is gone
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  });

  test('Failed Login - Invalid Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Enter standard_user for invalid password test
    await page.locator('[data-test="username"]').fill('standard_user');

    // Enter invalid password to test error handling
    await page.locator('[data-test="password"]').fill('wrong_password');

    // Test invalid password error message
    await page.locator('[data-test="login-button"]').click();

    // Verify invalid credentials error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');

    // Close invalid credentials error message
    await page.locator('[data-test="error-button"]').click();

    // Verify error message is cleared
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  });

  test('Form Validation - Empty Username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Clear username field for empty username test
    await page.locator('[data-test="username"]').fill('');

    // Enter password for empty username validation test
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Test empty username validation error
    await page.locator('[data-test="login-button"]').click();

    // Verify username required error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');

    // Close username required error message
    await page.locator('[data-test="error-button"]').click();

    // Verify error message is cleared
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  });

  test('Form Validation - Empty Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Enter username for empty password validation test
    await page.locator('[data-test="username"]').fill('standard_user');

    // Clear password field for empty password validation test
    await page.locator('[data-test="password"]').fill('');

    // Test empty password validation error
    await page.locator('[data-test="login-button"]').click();

    // Verify password required error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');

    // Close password required error message
    await page.locator('[data-test="error-button"]').click();

    // Verify error message is cleared
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  });

  test('Special User - Problem User Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Enter problem_user for special user login test
    await page.locator('[data-test="username"]').fill('problem_user');

    // Enter password for problem_user login test
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Test problem_user successful login
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login - user is redirected to inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('Special User - Performance Glitch User Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Enter performance_glitch_user for special user login test
    await page.locator('[data-test="username"]').fill('performance_glitch_user');

    // Enter password for performance_glitch_user login test
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Test performance_glitch_user successful login
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login (may be slower than normal)
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('Special User - Error User Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Enter error_user for special user login test
    await page.locator('[data-test="username"]').fill('error_user');

    // Enter password for error_user login test
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Test error_user successful login
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('Special User - Visual User Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Enter visual_user for special user login test
    await page.locator('[data-test="username"]').fill('visual_user');

    // Enter password for visual_user login test
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // Test visual_user successful login
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('Login Page UI Elements Verification', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Verify page title and logo
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

    // Verify form elements are present and have correct attributes
    const usernameField = page.locator('[data-test="username"]');
    const passwordField = page.locator('[data-test="password"]');
    const loginButton = page.locator('[data-test="login-button"]');

    await expect(usernameField).toBeVisible();
    await expect(usernameField).toHaveAttribute('placeholder', 'Username');
    
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toHaveAttribute('placeholder', 'Password');
    await expect(passwordField).toHaveAttribute('type', 'password');

    await expect(loginButton).toBeVisible();
    await expect(loginButton).toHaveAttribute('type', 'submit');

    // Verify accepted usernames and password info are displayed
    await expect(page.locator(':text("Accepted usernames are:")')).toBeVisible();
    await expect(page.locator(':text("Password for all users:")')).toBeVisible();
    await expect(page.locator(':text("secret_sauce")')).toBeVisible();
  });

});