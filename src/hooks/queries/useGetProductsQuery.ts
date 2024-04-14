import { getProducts } from '@/apis/Product/getProducts';
import { useQuery } from '@tanstack/react-query';

export const useGetProductsQuery = () => {
  const { data: products } = useQuery({
    queryKey: ['products', 'lists'],
    queryFn: getProducts,
    staleTime: 60 * 5 * 1000,
    gcTime: 60 * 30 * 1000,
  });

  return { products };
};
