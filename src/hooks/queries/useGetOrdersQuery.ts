import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/apis/Order/getOrders';
import { Order } from '@/types/order';

export const useGetOrdersQuery = () => {
  const { data: orders } = useQuery({
    queryKey: ['orders', 'lists'],
    queryFn: getOrders,
    staleTime: 60 * 60 * 24 * 1000,
    gcTime: 60 * 60 * 24 * 1000,
  });

  return { orders } as { orders: Order[] };
};
