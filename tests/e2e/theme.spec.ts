import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const html = page.locator('html');
    let initialTheme = await html.getAttribute('data-theme');
    
    // If no theme attribute, wait a moment and try again
    if (!initialTheme) {
      await page.waitForTimeout(500);
      initialTheme = await html.getAttribute('data-theme');
    }
    
    expect(['light', 'dark']).toContain(initialTheme);

    const themeToggleButton = page.locator('.theme-toggle');
    await themeToggleButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await themeToggleButton.click();

    // Wait for theme to change
    await page.waitForTimeout(300);
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should persist theme preference across page navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    // Toggle theme
    const themeToggleButton = page.locator('.theme-toggle');
    await themeToggleButton.click();
    
    const changedTheme = await html.getAttribute('data-theme');
    expect(changedTheme).not.toBe(initialTheme);

    // Navigate to About page
    const navLinks = page.locator('.nav-links a');
    const aboutLink = navLinks.nth(1);
    await aboutLink.click();
    await page.waitForURL('/about');

    // Check if theme is persisted
    const persistedTheme = await html.getAttribute('data-theme');
    expect(persistedTheme).toBe(changedTheme);
  });
});
