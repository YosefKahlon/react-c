import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts, addToFavorites } from '../api/productApi';
import { useFilterContext } from '../context/FilterContext';
import { useToast } from '../hooks/useToast';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect, useState, useMemo } from 'react';
import './Products.css';

const Products = () => {
  const { selectCategory: selectedCategory } = useFilterContext();
  const toast = useToast();
  
  // Store favorites as array in localStorage, convert to Set for usage
  const [favoritesArray, setFavoritesArray] = useLocalStorage<number[]>('favorites', []);
  const favorites = useMemo(() => new Set(favoritesArray), [favoritesArray]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProducts(selectedCategory || undefined),
  });

  // Mutation for toggling favorites
  const favoriteMutation = useMutation({
    mutationFn: ({ productId, isAdding }: { productId: number; isAdding: boolean }) => 
      addToFavorites(productId, isAdding),
    onSuccess: (data) => {
      if (data.isAdding) {
        setFavoritesArray(prev => [...prev, data.productId]);
        toast.success(`Product added to favorites!`);
      } else {
        setFavoritesArray(prev => prev.filter(id => id !== data.productId));
        toast.info(`Product removed from favorites`);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to update favorites: ${error.message}`);
    },
  });

  // Show error toast when query fails
  useEffect(() => {
    if (error) {
      toast.error(`Failed to load products: ${error.message}`);
    }
  }, [error, toast]);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="products-container">
      <h1>Products</h1>

      <p>Total: {data?.total} products {selectedCategory && `in "${selectedCategory}"`}</p>
      <ul className="products-list">
        {data?.products.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/products/${product.id}`}>
              {product.title}
            </Link> - ${product.price} <span className="product-category">({product.category})</span>
            <button 
              onClick={() => {
                const isFavorited = favorites.has(product.id);
                favoriteMutation.mutate({ productId: product.id, isAdding: !isFavorited });
              }}
              disabled={favoriteMutation.isPending}
              className={`favorite-button ${favorites.has(product.id) ? 'favorited' : ''}`}
            >
              {favoriteMutation.isPending ? '...' : favorites.has(product.id) ? '♥' : '♡'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
