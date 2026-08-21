import { test, expect } from '@playwright/test';

test('favicon, touch icon, and social card are declared and served', async ({ page, request }) => {
  await page.goto('/');

  const hrefFor = (selector: string) =>
    page
      .locator(selector)
      .first()
      .getAttribute('href')
      .then((value) => value ?? '');

  const iconHref = await hrefFor('link[rel="icon"]');
  expect(iconHref).toContain('/icon.png');

  const appleHref = await hrefFor('link[rel="apple-touch-icon"]');
  expect(appleHref).toContain('/apple-icon.png');

  for (const href of [iconHref, appleHref]) {
    const response = await request.get(href);
    expect(response.status(), `${href} should be served`).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  }

  // Next derives og:image from src/app/opengraph-image.png.
  const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute('content');
  expect(ogImage).toContain('/opengraph-image.png');

  const ogResponse = await request.get(ogImage ?? '');
  expect(ogResponse.status()).toBe(200);
  expect(ogResponse.headers()['content-type']).toContain('image/png');
});

test('header renders the logo mark and links home', async ({ page }) => {
  await page.goto('/about');

  const homeLink = page.getByRole('banner').getByRole('link', { name: 'ATS — home' });
  await expect(homeLink).toBeVisible();

  // The mark is decorative (alt=""), so assert it actually decoded rather than
  // relying on an accessible name.
  const loaded = await homeLink.locator('img').evaluate((node) => {
    const image = node as HTMLImageElement;
    return image.complete && image.naturalWidth > 0;
  });
  expect(loaded, 'logo image should decode').toBe(true);

  await homeLink.click();
  await expect(page).toHaveURL(/\/$/);
});
