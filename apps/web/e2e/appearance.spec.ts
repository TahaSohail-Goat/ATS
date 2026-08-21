import { test, expect } from '@playwright/test';

const ROUTES = ['/', '/services', '/projects', '/about', '/careers', '/contact'] as const;
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

test.describe('no horizontal overflow', () => {
  for (const viewport of VIEWPORTS) {
    test(`${viewport.name} (${viewport.width}px) layouts stay within the viewport`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const route of ROUTES) {
        await page.goto(route);
        // Decorative gradient fields are absolutely positioned and blurred;
        // a 1px allowance covers subpixel rounding of the scrollbar gutter.
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `${route} overflows horizontally`).toBeLessThanOrEqual(1);
      }
    });
  }
});

test('site renders dark by default and remembers a light-theme choice', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);

  const darkCanvas = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

  await page.getByRole('button', { name: /switch to light theme/i }).click();
  await expect(html).toHaveClass(/light/);

  const lightCanvas = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(lightCanvas).not.toBe(darkCanvas);

  // The choice must survive a reload without a flash of the wrong theme.
  await page.reload();
  await expect(html).toHaveClass(/light/);
  await expect(page.getByRole('button', { name: /switch to dark theme/i })).toBeVisible();
});

test('mobile navigation opens, traps escape, and closes on selection', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const toggle = page.getByRole('button', { name: 'Open menu' });
  await toggle.click();

  const mobileNav = page.getByRole('navigation', { name: 'Mobile' });
  await expect(mobileNav).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(mobileNav).toBeHidden();

  await page.getByRole('button', { name: 'Open menu' }).click();
  await mobileNav.getByRole('link', { name: 'Services' }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(mobileNav).toBeHidden();
});

test('pages render without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  for (const route of ROUTES) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }

  expect(errors).toEqual([]);
});
