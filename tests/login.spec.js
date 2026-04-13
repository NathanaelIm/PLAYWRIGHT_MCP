const { test, expect } = require('@playwright/test');

test('Login to SauceDemo', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://www.saucedemo.com/');
  
  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Input username
  await page.getByPlaceholder('Username').fill('standard_user');
  
  // Input password
  await page.getByPlaceholder('Password').fill('secret_sauce');
  
  // Click login button
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for navigation
  await page.waitForLoadState('networkidle');
  
  // Verify successful login
  expect(page.url()).toContain('inventory');
});
