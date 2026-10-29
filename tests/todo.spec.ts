import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('TodoMVC', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should add 3 todos', async () => {
  await todoPage.addTodos([
    'Buy groceries',
    'Study Playwright',
    'Complete assignment',
  ]);

  await todoPage.expectTodoCount(3);
});

  test('should mark a todo as complete and show 2 items left', async () => {
    await todoPage.addTodos([
      'Buy groceries',
      'Study Playwright',
      'Complete assignment',
    ]);

    await todoPage.completeTodo('Study Playwright');

    await todoPage.expectItemsLeft('2 items left');
  });

  test('should filter active and completed todos', async () => {
    await todoPage.addTodos([
      'Buy groceries',
      'Study Playwright',
      'Complete assignment',
    ]);

    await todoPage.completeTodo('Study Playwright');

    await todoPage.clickActive();

    await todoPage.expectTodoVisible('Buy groceries');
    await todoPage.expectTodoVisible('Complete assignment');
    await todoPage.expectTodoHidden('Study Playwright');

    await todoPage.clickCompleted();

    await todoPage.expectTodoVisible('Study Playwright');
    await todoPage.expectTodoHidden('Buy groceries');
    await todoPage.expectTodoHidden('Complete assignment');
  });

  test('should edit a todo', async () => {
  await todoPage.addTodo('Study Playwright');

  await todoPage.editTodo(
    'Study Playwright',
    'Study Playwright Automation'
  );

  await todoPage.expectTodoVisible('Study Playwright Automation');
});

  test('should delete a todo', async () => {
    await todoPage.addTodos([
      'Buy groceries',
      'Study Playwright',
    ]);

    await todoPage.deleteTodo('Buy groceries');

    await todoPage.expectTodoHidden('Buy groceries');
    await todoPage.expectTodoVisible('Study Playwright');
  });

  test('should clear only completed todos', async () => {
    await todoPage.addTodos([
      'Buy groceries',
      'Study Playwright',
      'Complete assignment',
    ]);

    await todoPage.completeTodo('Study Playwright');

    await todoPage.clearCompleted();

    await todoPage.expectTodoHidden('Study Playwright');
    await todoPage.expectTodoVisible('Buy groceries');
    await todoPage.expectTodoVisible('Complete assignment');
  });

  test('should add multiple todos using test data', async () => {
  const todos = [
    'Buy groceries',
    'Study Playwright',
    'Complete assignment',
  ];

  await todoPage.addTodos(todos);

  await todoPage.expectTodoCount(todos.length);

  for (const todo of todos) {
    await todoPage.expectTodoVisible(todo);
  }
});

});