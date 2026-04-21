import { test, expect } from '@playwright/test';

async function openStableHomepage(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    sessionStorage.setItem('zakka:intro-seen', '1');
  });

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

test.describe('ZakkaSite visual regression', () => {
  test('hero snapshot', async ({ page }) => {
    await openStableHomepage(page);

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(hero).toHaveScreenshot('hero.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
    });
  });

  test('about and experience snapshots', async ({ page }) => {
    await openStableHomepage(page);

    const about = page.locator('#about');
    await expect(about).toBeVisible();
    await expect(about).toHaveScreenshot('about.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
    });

    const experience = page.locator('#experience');
    await experience.scrollIntoViewIfNeeded();
    await expect(experience).toBeVisible();
    await expect(experience).toHaveScreenshot('experience.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
    });
  });

  test('projects snapshot', async ({ page }) => {
    await openStableHomepage(page);

    const projects = page.locator('#projects');
    await projects.scrollIntoViewIfNeeded();
    await expect(projects).toBeVisible();
    await expect(projects).toHaveScreenshot('projects.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
    });
  });
});
