const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// Login tests using Page Object Model

test.describe('Authentication - Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login with valid credentials and redirect to dashboard', async ({ page }) => {
    await loginPage.login('test', '1234');
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('user-info')).toContainText('test');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await loginPage.login('test', 'wrong');
    await loginPage.assertLoginError('Invalid credentials');
    await expect(page).toHaveURL('/login');
  });
}); 