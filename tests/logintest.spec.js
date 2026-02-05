const { test, expect } = require('@playwright/test');

test('Scenario 1: Login with correct credentials', async ({ page }) => {
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
  
  // Verify successful login - should be on inventory page
  expect(page.url()).toContain('inventory');
});

test('Scenario 2: Login with wrong password', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://www.saucedemo.com/');
  
  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Input username
  await page.getByPlaceholder('Username').fill('standard_user');
  
  // Input password with wrong value
  await page.getByPlaceholder('Password').fill('salah');
  
  // Click login button
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for response
  await page.waitForTimeout(2000);
  
  // Verify login failed - should still be on login page (URL should not contain inventory)
  expect(page.url()).not.toContain('inventory');
  expect(page.url()).toContain('saucedemo.com');
});
