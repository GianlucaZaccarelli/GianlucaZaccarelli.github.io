import { test, expect } from '@playwright/test';

test.describe('ZakkaSite smoke', () => {
  test('homepage loads with expected sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Gianluca Zaccarelli/);

    for (const id of ['about', 'experience', 'education', 'skills', 'projects', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('skip link is focusable and points to #about', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.locator('a.skip-to-content');
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#about');
  });

  test('dark mode toggle updates html class', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initialDark = await html.evaluate((el) => el.classList.contains('dark'));

    await page.locator('#theme-toggle').click();
    const toggledDark = await html.evaluate((el) => el.classList.contains('dark'));
    expect(toggledDark).not.toBe(initialDark);
  });

  test('en route renders localized headings with content fallback', async ({ page }) => {
    await page.goto('/en/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('#about .section-title')).toHaveText('About');
    await expect(page.locator('#experience .section-title')).toHaveText('Experience');
    await expect(page.locator('#education .section-title')).toHaveText('Education');
    await expect(page.locator('#skills .section-title')).toHaveText('Skills');
    await expect(page.locator('#projects .section-title')).toHaveText('Projects');
    await expect(page.locator('#contact .section-title')).toHaveText('Contact');

    const aboutParagraphs = page.locator('#about p');
    await expect(aboutParagraphs.first()).toBeVisible();
  });
});
