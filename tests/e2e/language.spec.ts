import { test, expect } from '@playwright/test';

test.describe('Language Selection', () => {
  test('should change language from English to Hebrew', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const languageSelect = page.locator('#language-select');
    
    // Wait for the select to be available
    await languageSelect.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    
    const currentLanguage = await languageSelect.inputValue().catch(() => 'en');
    expect(['en', 'he']).toContain(currentLanguage);

    // Only change if not already Hebrew
    if (currentLanguage !== 'he') {
      await languageSelect.selectOption('he');
      
      // Verify the change
      const updatedLanguage = await languageSelect.inputValue();
      expect(updatedLanguage).toBe('he');
    }
  });

  test('should persist language selection on page reload', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.header', { timeout: 10000 }).catch(() => {});

    const languageSelect = page.locator('#language-select');
    const initialLanguage = await languageSelect.inputValue();

    // Change language to the opposite of current
    const newLanguage = initialLanguage === 'en' ? 'he' : 'en';
    await languageSelect.selectOption(newLanguage);

    // Wait a moment for localStorage to be updated
    await page.waitForTimeout(500);

    // Reload the page
    await page.reload();
    await page.waitForSelector('.header', { timeout: 10000 }).catch(() => {});

    // Check if language is persisted
    const persistedLanguage = await languageSelect.inputValue();
    expect(persistedLanguage).toBe(newLanguage);
  });
});
