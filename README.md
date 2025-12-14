# React + TypeScript + Vite + TanStack Query

A products catalog application demonstrating TanStack Query for efficient data fetching and caching.

## What We Built

This project implements a complete data-fetching solution using TanStack Query (React Query) with the DummyJSON API.

**API Choice:** I chose DummyJSON.

- **List endpoint:** `/products`
- **Detail endpoint:** `/products/:id`
- **Categories endpoint:** `/products/categories`

### Features Implemented

✅ **Products List Page** - Home page displaying all products with category filtering  
✅ **Product Detail Page** - Individual product view with full details  
✅ **Dynamic Category Filter** - Fetched from API with smart caching  
✅ **Loading & Error States** - Automatic state management  
✅ **Dependent Queries** - Conditional data fetching based on URL parameters  
✅ **Query Caching** - Instant loading from cache when switching between categories

## How to Use

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Navigate the App

1. **Home Page** (`/`) - Browse all products or filter by category
2. **Click any product** - View detailed information
3. **Switch categories** - Notice instant loading from cache on revisited categories
4. **About Page** (`/about`) - Read complete implementation details

### Features to Try

- Filter products by category using the dropdown
- Watch the 🔄 fetching indicator during background updates
- Click on a product to see its details
- Use browser back button - data loads instantly from cache
- Switch between categories you've already visited - instant loading!

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development
- **TanStack Query** for server state management
- **React Router** for navigation
- **DummyJSON API** for mock data

## Key TanStack Query Features

### Smart Caching

Each query has a unique key that determines its cache entry:

- `['products', '']` - All products
- `['products', 'beauty']` - Beauty category
- `['product', '1']` - Product with ID 1

### Automatic State Management

No manual `useState` or `useEffect` needed:

```tsx
const { data, isLoading, error, isFetching } = useQuery({
  queryKey: ["products", category],
  queryFn: fetchProducts,
});
```

### Dependent Queries

Only fetch when conditions are met:

```tsx
useQuery({
  queryKey: ["product", id],
  queryFn: () => fetchProductById(id),
  enabled: !!id, // Only run when id exists
});
```

## Project Structure

```
src/
├── pages/
│   ├── Products.tsx       # List page with filtering
│   ├── Products.css       # Products list styles
│   ├── ProductDetail.tsx  # Detail page with dependent query
│   ├── ProductDetail.css  # Detail page styles
│   └── About.tsx          # Project documentation
├── App.tsx                # Routes configuration
└── main.tsx               # QueryClient setup
```

## Learn More

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [DummyJSON API](https://dummyjson.com)
