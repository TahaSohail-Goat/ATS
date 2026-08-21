import { test, expect } from '@playwright/test';

test('homepage renders the full story arc with working navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: /we build software/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /start a project/i }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /view our work/i })).toBeVisible();

  await expect(page.getByRole('heading', { name: /what we build for you/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /projects we are proud of/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /built on principles/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /what our clients say/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /have an idea/i })).toBeVisible();

  const nav = page.getByRole('navigation', { name: 'Main' });
  await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();
  await nav.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact$/);
});
