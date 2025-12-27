import type { Product, ProductsResponse, Category } from '../types/product';

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Generic fetch wrapper that handles error checking and JSON parsing
 */
const fetchApi = async <T>(url: string, errorMessage: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  return fetchApi<Product>(
    `${API_BASE_URL}/products/${id}`,
    'Failed to fetch product details'
  );
};

export const fetchProducts = async (category?: string): Promise<ProductsResponse> => {
  const url = category 
    ? `${API_BASE_URL}/products/category/${category}`
    : `${API_BASE_URL}/products`;
  
  return fetchApi<ProductsResponse>(url, 'Failed to fetch products');
};

export const fetchCategories = async (): Promise<Category[]> => {
  return fetchApi<Category[]>(
    `${API_BASE_URL}/products/categories`,
    'Failed to fetch categories'
  );
};

/**
 * Add or remove product from favorites (simulated mutation)
 */
export const addToFavorites = async (
  productId: number, 
  isAdding: boolean
): Promise<{ success: boolean; productId: number; isAdding: boolean }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return success response
  return { success: true, productId, isAdding };
};

/**
 * Simulate a broken API call for testing error toasts
 */
export const fetchBrokenProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${API_BASE_URL}/products/broken-endpoint`);
  if (!response.ok) {
    throw new Error('Failed to fetch products from broken endpoint');
  }
  return response.json();
};
