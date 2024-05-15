import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '@/apis/Product/getProductDetail';
import { Product } from '@/types/product';

export const useGetProductDetailQuery = (id: Product['id']) => {
  const { data: product } = useQuery({
    queryKey: ['products', 'lists', id],
    queryFn: () => getProductDetail(id),
    staleTime: 60 * 5 * 1000,
    gcTime: 60 * 30 * 1000,
    enabled: !!id,
  });

  return { product };
};
