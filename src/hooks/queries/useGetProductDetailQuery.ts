import { getProductDetail } from '@/apis/Product/getProductDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetProductDetailQuery = (id: string) => {
  const { data: product } = useQuery({
    queryKey: ['products', 'lists', id],
    queryFn: () => getProductDetail({ id }),
    staleTime: 60 * 5 * 1000,
    gcTime: 60 * 30 * 1000,
    enabled: !!id,
  });

  return { product };
};
