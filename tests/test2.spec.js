const { test, expect } = require('@playwright/test');

test('Scenario: Login dan Validasi Homepage', async ({ page }) => {
  // Buka https://www.saucedemo.com
  await page.goto('https://www.saucedemo.com');
  
  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Inputkan username
  await page.getByPlaceholder('Username').fill('standard_user');
  
  // Inputkan password
  await page.getByPlaceholder('Password').fill('secret_sauce');
  
  // Click login button
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for navigation complete
  await page.waitForLoadState('networkidle');
  
  // Validasi homepage - memverifikasi berhasil login ke inventory page
  expect(page.url()).toContain('inventory');
  
  // Tambahan: Validasi presence of product items di homepage
  const productItems = page.locator('.inventory_item');
  expect(await productItems.count()).toBeGreaterThan(0);
  
  // Validasi Sauce Labs logo terlihat
  const logoText = page.locator('.app_logo');
  await expect(logoText).toBeVisible();
});
