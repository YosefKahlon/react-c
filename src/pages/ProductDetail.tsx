import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchProductById } from '../api/productApi';
import { useToast } from '../hooks/useToast';
import { useEffect } from 'react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('products');
  const toast = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id, // Only run query when id exists
  });

  // Show error toast when query fails
  useEffect(() => {
    if (error) {
      toast.error(t('detailStatus.error', { message: error.message }));
    }
  }, [error, t, toast]);

  if (!id) {
    return <div>{t('detailStatus.missingId')}</div>;
  }

  if (isLoading) {
    return <div>{t('detailStatus.loading')}</div>;
  }

  if (error) {
    return <div>{t('detailStatus.error', { message: error.message })}</div>;
  }

  if (!data) {
    return <div>{t('detailStatus.notFound')}</div>;
  }

  return (
    <div className="product-detail-container">
      <h1>{data.title}</h1>
      <img src={data.thumbnail} alt={data.title} className="product-thumbnail" />
      <p className="product-info"><strong>{t('fields.price')}:</strong> ${data.price}</p>
      <p className="product-info"><strong>{t('fields.category')}:</strong> {data.category}</p>
      <p className="product-info"><strong>{t('fields.brand')}:</strong> {data.brand}</p>
      <p className="product-info"><strong>{t('fields.rating')}:</strong> {data.rating}/5</p>
      <p className="product-info"><strong>{t('fields.stock')}:</strong> {data.stock}</p>
      <p className="product-info"><strong>{t('fields.description')}:</strong> {data.description}</p>
    </div>
  );
};

export default ProductDetail;
