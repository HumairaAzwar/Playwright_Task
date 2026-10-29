import { expect, Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  private todoList() {
    return this.page
      .getByRole('list')
      .filter({ has: this.page.getByRole('checkbox') });
  }

  private todoItem(todo: string) {
  return this.todoList()
    .getByRole('listitem')
    .filter({
      has: this.page.getByText(todo, { exact: true }),
    });
}

  async addTodo(todo: string) {
    const input = this.page.getByPlaceholder('What needs to be done?');

    await input.fill(todo);
    await input.press('Enter');
  }

  async addTodos(todos: string[]) {
    for (const todo of todos) {
      await this.addTodo(todo);
    }
  }

  async completeTodo(todo: string) {
    await this.todoItem(todo)
      .getByRole('checkbox')
      .check();
  }

async editTodo(oldText: string, newText: string) {
  const todo = this.page.getByText(oldText, { exact: true });

  await todo.dblclick();

  const editInput = this.page.getByRole('textbox', {
    name: 'What needs to be done?',
  });

  await editInput.fill(newText);
  await editInput.press('Enter');
}

  async deleteTodo(todo: string) {
    const item = this.todoItem(todo);

    await item.hover();

    await item.getByRole('button').click();
  }

  async clickActive() {
    await this.page.getByRole('link', { name: 'Active' }).click();
  }

  async clickCompleted() {
    await this.page.getByRole('link', { name: 'Completed' }).click();
  }

  async clickAll() {
    await this.page.getByRole('link', { name: 'All' }).click();
  }

  async clearCompleted() {
    await this.page
      .getByRole('button', { name: 'Clear completed' })
      .click();
  }

  async expectTodoVisible(todo: string) {
    await expect(this.todoItem(todo)).toBeVisible();
  }

  async expectTodoHidden(todo: string) {
    await expect(this.todoItem(todo)).toBeHidden();
  }

  async expectItemsLeft(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async expectTodoCount(count: number) {
    await expect(this.todoList().getByRole('listitem')).toHaveCount(count);
  }
}