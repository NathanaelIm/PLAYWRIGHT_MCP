const { test, expect } = require('@playwright/test');

test('Login to Sauce Demo and Validate Main Page', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://www.saucedemo.com/');
  
  // Verify login page is loaded
  await expect(page).toHaveTitle('Swag Labs');
  
  // Fill in username
  await page.fill('[data-test="username"]', 'standard_user');
  
  // Fill in password
  await page.fill('[data-test="password"]', 'secret_sauce');
  
  // Click login button
  await page.click('[data-test="login-button"]');
  
  // Wait for URL to change to inventory page
  await page.waitForURL(/inventory\.html/, { timeout: 10000 });
  
  // Validate we are on the main menu (inventory page)
  await expect(page).toHaveURL(/inventory\.html/);
  
  // Validate the page title shows "Products"
  await expect(page.locator('.title')).toContainText('Products');
  
  // Validate that inventory items are visible
  const inventoryItems = page.locator('[data-test="inventory-item"]');
  const count = await inventoryItems.count();
  console.log(`✓ Found ${count} products on the page`);
  expect(count).toBeGreaterThan(0);
  
  // Validate that the first product (Sauce Labs Backpack) is visible
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  
  // Validate additional products are visible
  await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Bike Light")')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Bolt T-Shirt")')).toBeVisible();
  
  // Validate that "Add to cart" buttons are visible
  const addToCartButtons = page.locator('button:has-text("Add to cart")');
  const buttonCount = await addToCartButtons.count();
  console.log(`✓ Found ${buttonCount} Add to cart buttons`);
  expect(buttonCount).toBeGreaterThan(0);
  
  // Take a screenshot of the main menu
  await page.screenshot({ path: 'screenshots/main_menu.png', fullPage: true });
  console.log('✓ Screenshot saved to screenshots/main_menu.png');
  
  console.log('✓ Login successful');
  console.log('✓ Main menu page validated');
  console.log('✓ All validation checks passed');
});
