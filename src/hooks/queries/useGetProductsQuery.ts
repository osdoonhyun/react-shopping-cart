import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/apis/Product/getProducts';
import { PRODUCT_QUERY_KEYS } from '@/constants/queryKey';

export const useGetProductsQuery = () => {
  const { data: products } = useQuery({
    queryKey: PRODUCT_QUERY_KEYS.LISTS(),
    queryFn: getProducts,
    staleTime: 60 * 5 * 1000,
    gcTime: 60 * 30 * 1000,
  });

  return { products };
};
