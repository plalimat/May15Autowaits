import { test, expect } from '@playwright/test';

test('Case Study: E-commerce Waits Demo', async ({ page, context }) => {

  console.log("Step 1: Open website");
  await page.goto('https://www.saucedemo.com/');

  // ✅ 1. waitForLoadState
  console.log("Waiting for page load...");
  await page.waitForLoadState('load');

  // ❌ 2. Hard wait (only for demo)
  console.log("Hard wait (not recommended)...");
  await page.waitForTimeout(2000);

  // ✅ 3. Auto-wait (Playwright handles internally)
  console.log("Entering login details...");
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

  // ✅ 4. Click login
  await page.getByRole('button', { name: 'Login' }).click();

  // ✅ 5. waitForURL (navigation)
  console.log("Waiting for products page...");
  await page.waitForURL(/inventory/);

  // ✅ 6. waitForLoadState (networkidle)
  console.log("Waiting for API/data load...");
  await page.waitForLoadState('load');

  // ✅ 7. Assertion auto-wait
  console.log("Validating page title...");
  await expect(page.locator('.title')).toHaveText('Products');

  // ✅ 8. waitForSelector (explicit wait - demo)
  console.log("Waiting for product item...");
  await page.waitForSelector('.inventory_item');

  // ✅ 9. waitForEvent (new tab simulation)
  console.log("Handling possible new tab...");

  /* wait for a new page event with a timeout, but don't fail if it doesn't happen */
  const pagePromise = context.waitForEvent('page', { timeout: 5000 }).catch(() => null);

  // (Click action – may or may not open new tab)
  await page.locator('.inventory_item a').first().click();

  const newPage = await pagePromise;

  if (newPage) {
    console.log("New tab opened!");
    await newPage.waitForLoadState();
  } else {
    console.log("No new tab opened (handled safely)");
  }

  console.log("Test completed successfully!");
});