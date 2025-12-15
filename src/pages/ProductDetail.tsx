import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productApi';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id, // Only run query when id exists
  });

  if (!id) {
    return <div>No product ID provided</div>;
  }

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <h1>{data.title}</h1>
      <img src={data.thumbnail} alt={data.title} className="product-thumbnail" />
      <p className="product-info"><strong>Price:</strong> ${data.price}</p>
      <p className="product-info"><strong>Category:</strong> {data.category}</p>
      <p className="product-info"><strong>Brand:</strong> {data.brand}</p>
      <p className="product-info"><strong>Rating:</strong> {data.rating}/5</p>
      <p className="product-info"><strong>Stock:</strong> {data.stock}</p>
      <p className="product-info"><strong>Description:</strong> {data.description}</p>
    </div>
  );
};

export default ProductDetail;
