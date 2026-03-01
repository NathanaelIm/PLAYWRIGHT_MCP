const { test, expect } = require('@playwright/test');

test('Login scenario on saucedemo', async ({ page }) => {
  // Buka halaman saucedemo
  await page.goto('https://www.saucedemo.com/');

  // Inputkan username
  await page.fill('input[data-test="username"]', 'standard_user');

  // Inputkan password
  await page.fill('input[data-test="password"]', 'secret_sauce');

  // (Optional) Klik tombol login jika ingin melanjutkan
  // await page.click('input[data-test="login-button"]');

  // (Optional) Verifikasi input sudah terisi
  await expect(page.locator('input[data-test="username"]')).toHaveValue('standard_user');
  await expect(page.locator('input[data-test="password"]')).toHaveValue('secret_sauce');
});
