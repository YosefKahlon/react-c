# Playwright Testing

This directory contains end-to-end tests for the React app using Playwright.

## Test Files

- **navigation.spec.ts** - Tests for page navigation functionality
- **theme.spec.ts** - Tests for theme toggle and persistence
- **language.spec.ts** - Tests for language selection and persistence
- **products.spec.ts** - Tests for products page and product detail navigation

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests in UI Mode
```bash
npm run test:e2e:ui
```

### Run Tests in Debug Mode
```bash
npm run test:e2e:debug
```

### Run Specific Test File
```bash
npx playwright test tests/e2e/navigation.spec.ts
```

### Generate HTML Report
```bash
npx playwright show-report
```

## Prerequisites

- Node.js and npm installed
- The development server can be started with `npm run dev`
- Tests expect the app to be running on `http://localhost:5173`

## Test Coverage

The test suite covers the following features:

1. **Navigation** - Tests for routing between pages (Products, About)
2. **Theme Toggle** - Tests for light/dark theme switching and persistence
3. **Language Selection** - Tests for language switching and persistence
4. **Products Page** - Tests for product display and navigation to product details

## Notes

- Tests run in parallel across Chromium, Firefox, and WebKit browsers
- The Playwright server automatically starts the dev server before running tests
- Test reports are saved in the `playwright-report` directory
