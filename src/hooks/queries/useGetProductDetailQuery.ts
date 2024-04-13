import { getProductDetail } from '@/apis/Product/getProductDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetProductDetailQuery = (id: string) => {
  const { data: product } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail({ id }),
    enabled: !!id,
  });

  return { product };
};
