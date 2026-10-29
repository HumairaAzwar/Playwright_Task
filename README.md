# Playwright Task

This project contains automated tests using Playwright Test and TypeScript for the Playwright documentation website and TodoMVC application.

## Installation

Clone or download the project and open the project folder in the terminal.

Install the dependencies:
npm install

Install the Chromium browser:
npx playwright install chromium

## Run Tests

Run all tests:
npx playwright test

Run a specific test file:

npx playwright test tests/docs.spec.ts
npx playwright test tests/todo.spec.ts

## View HTML Report

After running the tests, open the HTML report using
npx playwright show-report

## Test Coverage

### Playwright Documentation

The documentation tests cover

- Verifying the Playwright home page title
- Navigating to the Getting Started page
- Verifying the Installation heading
- Searching for "locators"

### TodoMVC

The TodoMVC tests cover

- Adding three todos
- Completing a todo
- Verifying the number of remaining items
- Filtering active and completed todos
- Editing a todo
- Deleting a todo
- Clearing completed todos

## Test Configuration

The Playwright configuration includes:

- Chromium browser
- TypeScript
- HTML reporter
- Base URL
- Trace collection on the first retry
- Screenshots on failure
- Videos on failure

## Test Result

All current tests are passing successfully.
