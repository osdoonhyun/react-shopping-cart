import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/apis/Order/getOrders';

export const useGetOrderResultQuery = () => {
  const { data: orderResult } = useQuery({
    queryKey: ['orders', 'results'],
    queryFn: getOrders,
    staleTime: 60 * 60 * 24 * 1000,
    gcTime: 60 * 60 * 24 * 1000,
    select: (orders) => orders[0].orderDetails,
  });

  return { orderResult };
};
