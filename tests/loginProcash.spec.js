const { test, expect } = require('@playwright/test');

test('Login to Procash with credentials', async ({ page }) => {
  // Navigate to login page
  await page.goto('http://172.24.169.172/loyalty/auth-login');
  
  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Input personal number
  await page.getByPlaceholder('Personal Number').fill('08312032');
  
  // Input password
  await page.getByRole('textbox', { name: 'Password' }).fill('0312838213');
  
  // Click login button (Sign In button)
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Wait for navigation
  await page.waitForLoadState('networkidle');
  
  // Verify successful login
  expect(page.url()).not.toContain('auth-login');
});
