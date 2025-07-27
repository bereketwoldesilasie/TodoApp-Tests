const { expect } = require('@playwright/test');
class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.todoTitleInput = page.getByTestId('todo-title-input');
    this.todoDescriptionInput = page.getByTestId('todo-description-input');
    this.addTodoButton = page.getByTestId('add-todo-button');
    this.successMessage = page.getByTestId('success-message');
    this.errorMessage = page.getByTestId('error-message');
    this.todoList = page.getByTestId('todo-list');
    this.todoItems = () => this.page.locator('[data-testid^="todo-item-"]');
  }

  async addTodo(title, description = '') {
    await this.todoTitleInput.fill(title);
    await this.todoDescriptionInput.fill(description);
    await this.addTodoButton.click();
    await this.waitForSuccessMessage('added');
    await this.waitForTodoInList(title);
  }

  async getFirstTodoItem() {
    await expect(this.todoItems().first()).toBeVisible();
    return this.todoItems().first();
  }

  async editFirstTodo(newTitle, newDescription = '') {
    const todo = await this.getFirstTodoItem();
    await todo.getByTestId(/edit-todo-button-\d+/).click();
    await todo.getByTestId(/edit-title-input-\d+/).fill(newTitle);
    await todo.getByTestId(/edit-description-input-\d+/).fill(newDescription);
    await todo.getByTestId(/save-todo-button-\d+/).click();
    await this.waitForSuccessMessage('updated');
    await this.waitForTodoInList(newTitle);
  }

  async deleteFirstTodo() {
    const todo = await this.getFirstTodoItem();
    this.page.once('dialog', dialog => dialog.accept());
    const todoTitle = await todo.getByTestId(/todo-title-\d+/).innerText();
    await todo.getByTestId(/delete-todo-button-\d+/).click();
    await this.waitForSuccessMessage('deleted');
    await this.waitForTodoNotInList(todoTitle);
  }

  async waitForSuccessMessage(partialText) {
    await expect(this.successMessage).toBeVisible({ timeout: 3000 });
    await expect(this.successMessage).toContainText(partialText);
  }

  async waitForTodoInList(title) {
    await expect(this.todoList).toContainText(title, { timeout: 3000 });
  }

  async waitForTodoNotInList(title) {
    // Wait for the todo to disappear from the list
    await expect(this.todoList).not.toContainText(title, { timeout: 3000 });
  }

  async assertTodoPresent(title) {
    await this.waitForTodoInList(title);
  }

  async assertTodoNotPresent(title) {
    await this.waitForTodoNotInList(title);
  }

  async assertSuccessMessage(message) {
    await this.waitForSuccessMessage(message);
  }
}

module.exports = { DashboardPage };
  