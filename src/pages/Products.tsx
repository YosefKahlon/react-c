import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Products.css';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

const fetchProducts = async (category?: string): Promise<ProductsResponse> => {
  const url = category 
    ? `https://dummyjson.com/products/category/${category}`
    : 'https://dummyjson.com/products';
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch('https://dummyjson.com/products/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Fetch products
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['products', selectedCategory], // Different keys for different categories
    queryFn: () => fetchProducts(selectedCategory || undefined),
  });

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="products-container">
      <h1>Products</h1>
      
      <div className="filter-section">
        <label htmlFor="category">Filter by category: </label>
        <select 
          id="category"
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Products</option>
          {categories?.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        {isFetching && <span className="fetching-indicator">🔄 Fetching...</span>}
      </div>

      <p>Total: {data?.total} products {selectedCategory && `in "${selectedCategory}"`}</p>
      <ul className="products-list">
        {data?.products.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/products/${product.id}`}>
              {product.title}
            </Link> - ${product.price} <span className="product-category">({product.category})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
