// const { test, expect } = require('@playwright/test');

// // Helper: login before each test
// async function login(page) {
//   await page.goto('/login');
//   await page.getByTestId('username-input').fill('test');
//   await page.getByTestId('password-input').fill('1234');
//   await page.getByTestId('login-button').click();
//   await expect(page).toHaveURL('/');
// }

// test.describe('Todo CRUD', () => {
//   test.beforeEach(async ({ page }) => {
//     await login(page);
//   });

//   test('Create a new todo', async ({ page }) => {
//     await page.getByTestId('todo-title-input').fill('Playwright Test Todo');
//     await page.getByTestId('todo-description-input').fill('Created by Playwright');
//     await page.getByTestId('add-todo-button').click();
//     await expect(page.getByTestId('success-message')).toContainText('added');
//     await expect(page.getByTestId('todo-list')).toContainText('Playwright Test Todo');
//   });

//   test('Edit an existing todo', async ({ page }) => {
//     // Create first
//     await page.getByTestId('todo-title-input').fill('Edit Me');
//     await page.getByTestId('add-todo-button').click();
//     // Find the first todo's edit button
//     const todoItem = page.getByTestId(/todo-item-\d+/).first();
//     await todoItem.getByTestId(/edit-todo-button-\d+/).click();
//     const editTitle = todoItem.getByTestId(/edit-title-input-\d+/);
//     await editTitle.fill('Edited Title');
//     await todoItem.getByTestId(/save-todo-button-\d+/).click();
//     await expect(page.getByTestId('success-message')).toContainText('updated');
//     await expect(todoItem.getByTestId(/todo-title-\d+/)).toHaveText('Edited Title');
//   });

//   test('Delete a todo', async ({ page }) => {
//     // Create first
//     await page.getByTestId('todo-title-input').fill('Delete Me');
//     await page.getByTestId('add-todo-button').click();
//     // Find the first todo's delete button
//     const todoItem = page.getByTestId(/todo-item-\d+/).first();
//     // Click delete and accept confirm
//     page.once('dialog', dialog => dialog.accept());
//     await todoItem.getByTestId(/delete-todo-button-\d+/).click();
//     await expect(page.getByTestId('success-message')).toContainText('deleted');
//     await expect(page.getByTestId('todo-list')).not.toContainText('Delete Me');
//   });

//   test('Assert presence of expected data after actions', async ({ page }) => {
//     // Create
//     await page.getByTestId('todo-title-input').fill('Assert Me');
//     await page.getByTestId('add-todo-button').click();
//     await expect(page.getByTestId('todo-list')).toContainText('Assert Me');
//     // Edit
//     const todoItem = page.getByTestId(/todo-item-\d+/).first();
//     await todoItem.getByTestId(/edit-todo-button-\d+/).click();
//     await todoItem.getByTestId(/edit-title-input-\d+/).fill('Asserted');
//     await todoItem.getByTestId(/save-todo-button-\d+/).click();
//     await expect(todoItem.getByTestId(/todo-title-\d+/)).toHaveText('Asserted');
//     // Delete
//     page.once('dialog', dialog => dialog.accept());
//     await todoItem.getByTestId(/delete-todo-button-\d+/).click();
//     await expect(page.getByTestId('todo-list')).not.toContainText('Asserted');
//   });
// }); 