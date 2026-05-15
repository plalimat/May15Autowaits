import { test, expect } from '@playwright/test';

test('Playwright Waits Demo - OrangeHRM', async ({ page }) => {

  console.log("Step 1: Open login page");
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // ✅ waitForLoadState - page completely loaded
  console.log("Waiting for page to fully load...");
  await page.waitForLoadState('load');

  // ❌ Hard wait (only demo) - NOT recommended in real tests
  console.log("Hard wait for demo purpose...");
  await page.waitForTimeout(2000);

  // ✅ Auto-wait (best)
  // playwright getByRole auto-waits for the element to be ready before performing actions
  // getByRole based on the role of the element and its accessible name (label)
    console.log("Entering login details...");

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

  // ✅ Click login
  await page.getByRole('button', { name: 'Login' }).click();

  // ✅ waitForURL - https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index
  // This uses a Regular Expression (Regex) -> not for Exact match 
  // we should not give the full url
  // this works in playwright.config.ts as well for baseURL and in page.goto

  // Wait until the URL contains the word dashboard anywhere
  console.log("Waiting for dashboard URL...");
  await page.waitForURL(/dashboard/);

  /*
    when the web page is opened, HTML loads
CSS loads
JS loads
API calls happen
then the state becomes idle (networkidle) - no more network calls happening
This is the best state to do any actions or assertions on the page, because we are sure that all the elements are loaded 
and ready for interaction
  */
  // ✅ networkidle
  await page.waitForLoadState('networkidle');

  // ✅ Assertion auto-wait
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  console.log("Test completed successfully!");
});