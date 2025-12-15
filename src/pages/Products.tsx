import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchProducts, fetchCategories } from '../api/productApi';
import './Products.css';

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
