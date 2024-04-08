import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/apis/Order/getOrders';

export const useGetOrdersQuery = () => {
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  return { orders };
};
