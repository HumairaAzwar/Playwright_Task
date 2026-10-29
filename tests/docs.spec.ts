import { test, expect } from '@playwright/test';

test.describe('Playwright Documentation', () => {

  test('should display Playwright in the home page title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should navigate to the getting started page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Get started' }).click();

    await expect(page).toHaveURL(/\/docs\/intro/);
  });

  test('should display the Installation heading', async ({ page }) => {
    await page.goto('/docs/intro');

    await expect(
      page.getByRole('heading', { name: 'Installation' })
    ).toBeVisible();
  });

  test('should find locators using site search', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /search/i }).click();

    await page.getByPlaceholder(/search/i).fill('locators');

    await expect(
      page.getByText(/locators/i).first()
    ).toBeVisible();
  });

});