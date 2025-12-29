import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate from Products to About page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click About link in navigation
    const navLinks = page.locator('.nav-links a');
    const aboutLink = navLinks.nth(1); // Second link should be About
    await aboutLink.click();

    await page.waitForURL('/about');
    expect(page.url()).toContain('/about');
  });

  test('should navigate from About back to Products', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');

    // Click Products link in navigation
    const navLinks = page.locator('.nav-links a');
    const productsLink = navLinks.nth(0); // First link should be Products
    await productsLink.click();

    await page.waitForURL('/');
    expect(page.url()).not.toContain('/about');
  });

  test('should navigate to home by clicking logo', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('.logo');
    await logo.click();

    await page.waitForURL('/');
    expect(page.url()).toBe('http://localhost:5173/');
  });
});
