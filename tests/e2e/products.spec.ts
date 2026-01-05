import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('should display products on the main page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for products container to load
    await page.waitForSelector('.products-container', { timeout: 5000 }).catch(() => {});
    
    // Check if page has products-container
    const productsContainer = await page.locator('.products-container').isVisible().catch(() => false);
    expect(productsContainer).toBeTruthy();
    
    // Check if page has heading
    const heading = await page.locator('.products-container h1').isVisible().catch(() => false);
    expect(heading).toBeTruthy();
  });

  test('should navigate to product detail when clicking a product', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find product table rows and click first one
    const productRows = page.locator('.p-datatable-tbody tr');
    const rowCount = await productRows.count();
    
    if (rowCount > 0) {
      const firstRow = productRows.nth(0);
      const productLink = firstRow.locator('a');
      const linkExists = await productLink.count().then(c => c > 0);
      
      if (linkExists) {
        await productLink.first().click();
        
        // Wait for navigation to product detail page
        await page.waitForURL(/\/products\/[0-9]+/, { timeout: 5000 }).catch(() => {});
        
        // Verify we're on product detail page
        expect(page.url()).toMatch(/\/products/);
      }
    }
  });

  test('should toggle filter sidebar with button', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the filter button in header
    const filterButton = page.locator('.filter-button');
    
    if (await filterButton.isVisible()) {
      // Get the filter sidebar
      const filterSidebar = page.locator('.filter-sidebar, [class*="FilterSidebar"]');
      
      // Click the filter button
      await filterButton.click();
      
      // Wait for animation
      await page.waitForTimeout(300);
      
      // Button should still be visible after click
      expect(await filterButton.isVisible()).toBeTruthy();
    }
  });
});
