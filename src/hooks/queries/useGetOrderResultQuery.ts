import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/apis/Order/getOrders';
import { ORDER_QUERY_KEYS } from '@/constants/queryKey';

export const useGetOrderResultQuery = () => {
  const { data: orderResult } = useQuery({
    // TODO: 수정 필요 OrderResult -> OrderDetail
    queryKey: ORDER_QUERY_KEYS.DETAIL(0),
    queryFn: getOrders,
    staleTime: 60 * 60 * 24 * 1000,
    gcTime: 60 * 60 * 24 * 1000,
    select: (orders) => orders[0].orderDetails,
  });

  return { orderResult };
};
