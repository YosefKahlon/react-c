import { Product, ProductsResponse, Category } from '../types/product';

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
