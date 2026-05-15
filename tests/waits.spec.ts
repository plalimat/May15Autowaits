import { test, expect } from '@playwright/test';

test('Playwright Waits Demo - OrangeHRM', async ({ page, context }) => {

  console.log("Step 1: Open login page");
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // ✅ 1. waitForLoadState
  console.log("Waiting for page to fully load...");
  await page.waitForLoadState('load');

  // ✅ 2. waitForTimeout (Hard wait - NOT recommended)
  console.log("Hard wait for demo purpose...");
  await page.waitForTimeout(2000);

  // ✅ 3. Auto-wait with actions (No explicit wait needed)
  console.log("Entering login details...");
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

  // ✅ 4. waitForEvent (new page/tab example)
  console.log("Preparing to listen for new page event...");
  const newPagePromise = context.waitForEvent('page');

  // (Dummy action - OrangeHRM may not open new tab, just for demo)
  await page.getByRole('link', { name: 'OrangeHRM, Inc' }).click().catch(() => {});

  // Try to capture new page if opened
  const newPage = await newPagePromise.catch(() => null);
  if (newPage) {
    console.log("New page opened!");
    await newPage.waitForLoadState();
  } else {
    console.log("No new page opened (expected in this demo)");
  }

  // ✅ 5. Click login
  console.log("Click login button...");
  await page.getByRole('button', { name: 'Login' }).click();

  // ✅ 6. waitForURL
  console.log("Waiting for dashboard URL...");
  await page.waitForURL(/dashboard/);

  // ✅ 7. waitForLoadState (networkidle)
  console.log("Waiting for network to be idle...");
  await page.waitForLoadState('networkidle');

  // ✅ 8. Assertion Auto-wait
  console.log("Verifying dashboard heading...");
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  console.log("All wait concepts executed successfully!");
});