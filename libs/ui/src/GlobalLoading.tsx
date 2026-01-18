import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import './GlobalLoading.css';

const GlobalLoading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  if (!isLoading) return null;

  return (
    <div className="global-loading-bar">
      <div className="global-loading-progress"></div>
    </div>
  );
};

export default GlobalLoading;
