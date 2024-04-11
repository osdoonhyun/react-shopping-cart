import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/apis/Order/getOrders';

export const useGetOrderResultQuery = () => {
  const { data: orderResult } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    select: (orders) => orders[0].orderDetails,
  });

  return { orderResult };
};
