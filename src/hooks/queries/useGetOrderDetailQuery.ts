import { getOrderDetail } from '@/apis/Order/getOrderDetail';
import { Order } from '@/types/order';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderDetailQuery = ({ id }: Pick<Order, 'id'>) => {
  const { data } = useQuery({
    queryKey: ['orders', 'lists', id],
    queryFn: () => getOrderDetail({ id }),
    staleTime: 60 * 60 * 24 * 1000,
    gcTime: 60 * 60 * 24 * 1000,
    enabled: !!id,
  });

  const orderDetails = data?.orderDetails || [];

  return { orderDetails };
};
