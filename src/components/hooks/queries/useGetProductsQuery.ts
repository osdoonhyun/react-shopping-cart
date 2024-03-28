import { getProducts } from '@components/apis/Product/getProducts';
import { useQuery } from '@tanstack/react-query';

export const useGetProductsQuery = () => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return { products };
};
