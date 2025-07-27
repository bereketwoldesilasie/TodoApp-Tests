const { expect } = require('@playwright/test');
class LoginPage {
    
  /**
   * @param {import('@playwright/test').Page} page
   */
  
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.loginError = page.getByTestId('login-error');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginError(message) {
    await this.loginError.waitFor({ state: 'visible' });
    await expect(this.loginError).toContainText(message);
  }
}

module.exports = { LoginPage }; 