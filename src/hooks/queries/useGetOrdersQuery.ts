import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/apis/Order/getOrders';
import { Order } from '@/types/order';

export const useGetOrdersQuery = () => {
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  return { orders } as { orders: Order[] };
};
