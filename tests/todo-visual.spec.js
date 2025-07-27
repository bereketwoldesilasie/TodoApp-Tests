const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

// Helper: login and return dashboard page
async function loginAndGoToDashboard(page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('test', '1234');
  await expect(page).toHaveURL('/');
  return new DashboardPage(page);
}

test.describe('Static Visual Snapshots', () => {
  test('dashboard navbar visual snapshot (static)', async ({ page }) => {
    await loginAndGoToDashboard(page);
    const navbar = page.getByTestId('navbar-brand');
    await expect(navbar).toHaveScreenshot('dashboard-navbar.png', { maxDiffPixels: 5 });
  });


}); 