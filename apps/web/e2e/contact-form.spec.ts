import { test, expect } from '@playwright/test';

test('visitor can see and fill the contact form', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { name: /contact us/i })).toBeVisible();

  await page.getByLabel(/name/i).fill('Ada Lovelace');
  await page.getByLabel(/email/i).fill('ada@example.com');
  await page.getByLabel(/message/i).fill('Interested in learning more about ATS.');

  // Hosted-provider submission is intentionally not performed in CI.
  // This remains a UI smoke test. See docs/development/testing.md.
  await expect(page.getByRole('button', { name: /send message/i })).toBeDisabled();
});
