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

test.describe('Todo Management - CRUD', () => {
  let dashboard;

  test.beforeEach(async ({ page }) => {
    dashboard = await loginAndGoToDashboard(page);
  });

  test('should create a new todo item', async () => {
    await dashboard.addTodo('POM Test Todo', 'Created by POM');
    await dashboard.assertTodoPresent('POM Test Todo');
  });

  test('should edit an existing todo item', async () => {
    await dashboard.addTodo('Edit Me', '');
    await dashboard.editFirstTodo('Edited by POM', 'Edited description');
    await dashboard.assertTodoPresent('Edited by POM');
  });

  test('should delete a todo item', async () => {
    await dashboard.addTodo('Delete Me', '');
    await dashboard.deleteFirstTodo();
    await dashboard.assertTodoNotPresent('Delete Me');
  });

  test('should reflect correct data after create, edit, and delete actions', async () => {
    // Create
    await dashboard.addTodo('Assert Me', '');
    await dashboard.assertTodoPresent('Assert Me');
    // Edit
    await dashboard.editFirstTodo('Asserted', '');
    await dashboard.assertTodoPresent('Asserted');
    // Delete
    await dashboard.deleteFirstTodo();
    await dashboard.assertTodoNotPresent('Asserted');
  });
});
