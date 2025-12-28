import { useQuery, useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchProducts, addToFavorites } from '../api/productApi';
import { useFilterContext } from '../context/FilterContext';
import { useToast } from '../hooks/useToast';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect, useMemo } from 'react';
import './Products.css';

const Products = () => {
  const { t } = useTranslation(['products', 'common']);
  const { selectCategory: selectedCategory } = useFilterContext();
  const toast = useToast();
  const navigate = useNavigate();
  
  // Store favorites as array in localStorage, convert to Set for usage
  const [favoritesArray, setFavoritesArray] = useLocalStorage<number[]>('favorites', []);
  const favorites = useMemo(() => new Set(favoritesArray), [favoritesArray]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProducts(selectedCategory || undefined),
  });

  const products = data?.products ?? [];
  const totalCount = data?.total ?? 0;

  // Mutation for toggling favorites
  const favoriteMutation = useMutation({
    mutationFn: ({ productId, isAdding }: { productId: number; isAdding: boolean }) => 
      addToFavorites(productId, isAdding),
    onSuccess: (data) => {
      if (data.isAdding) {
        setFavoritesArray(prev => [...prev, data.productId]);
        toast.success(t('products:toast.added'));
      } else {
        setFavoritesArray(prev => prev.filter(id => id !== data.productId));
        toast.info(t('products:toast.removed'));
      }
    },
    onError: (error: Error) => {
      toast.error(t('products:toast.error', { message: error.message }));
    },
  });

  // Show error toast when query fails
  useEffect(() => {
    if (error) {
      toast.error(t('products:status.error', { message: error.message }));
    }
  }, [error, t, toast]);

  if (isLoading) {
    return <div>{t('products:status.loading')}</div>;
  }

  if (error) {
    return <div>{t('products:status.error', { message: error.message })}</div>;
  }

  if (products.length === 0) {
    return <div>{t('products:status.empty')}</div>;
  }

  return (
    <div className="products-container">
      <h1>{t('products:title')}</h1>
      <p className="products-meta">
        {t('products:counts.showing', { count: products.length })}
        {selectedCategory && <> {t('products:counts.category', { category: selectedCategory })}</>}
        {' · '}
        {t('products:productCount', { count: totalCount })}
        {isFetching ? ' 🔄' : ''}
      </p>
      <p className="products-subtitle">
        <Trans
          i18nKey="products:aboutLink"
          components={{ link: <Link to="/about" className="products-about-link" /> }}
        />
      </p>
      <DataTable
        value={products}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20]}
        stripedRows
        responsiveLayout="scroll"
        onRowClick={(e) => navigate(`/products/${e.data.id}`)}
      >
        <Column
          field="title"
          header={t('products:fields.title')}
          sortable
        />
        <Column
          field="price"
          header={t('products:fields.price')}
          sortable
          body={(rowData) => `$${rowData.price}`}
        />
        <Column
          field="category"
          header={t('products:fields.category')}
          sortable
        />
        <Column
          header={t('products:fields.image')}
          body={(rowData) => (
            <img
              src={rowData.thumbnail}
              alt={rowData.title}
              className="product-image-thumb"
            />
          )}
        />
        <Column
          header={t('products:fields.actions')}
          body={(rowData) => (
            <div className="product-actions">
              <button
                className="action-button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/products/${rowData.id}`);
                }}
              >
                <i className="pi pi-external-link" aria-hidden /> {t('products:buttons.viewDetails')}
              </button>
              <button
                className={`favorite-button ${favorites.has(rowData.id) ? 'favorited' : ''}`}
                onClick={(event) => {
                  event.stopPropagation();
                  const isFavorited = favorites.has(rowData.id);
                  favoriteMutation.mutate({ productId: rowData.id, isAdding: !isFavorited });
                }}
                disabled={favoriteMutation.isPending}
                aria-label={favorites.has(rowData.id) ? t('products:buttons.favoriteRemove') : t('products:buttons.favoriteAdd')}
              >
                {favoriteMutation.isPending ? '...' : favorites.has(rowData.id) ? '♥' : '♡'}
              </button>
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

export default Products;
