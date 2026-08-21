import { test, expect } from '@playwright/test';

const ROUTES = ['/', '/services', '/projects', '/about', '/careers', '/contact'] as const;

test.describe('all public routes', () => {
  for (const route of ROUTES) {
    test(`${route} renders without errors`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();
    });
  }
});

test('project detail pages render from data', async ({ page }) => {
  const response = await page.goto('/projects/logistics-ai-platform');
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole('heading', { name: /logistics intelligence platform/i }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: /the problem/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /the solution/i })).toBeVisible();
});

test('unknown project slug returns 404', async ({ page }) => {
  const response = await page.goto('/projects/does-not-exist');
  expect(response?.status()).toBe(404);
});

test('sitemap and robots are served', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('/services');

  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('/sitemap.xml');
});
