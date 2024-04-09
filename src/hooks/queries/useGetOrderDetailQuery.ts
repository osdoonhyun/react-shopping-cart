import { getOrderDetail } from '@/apis/Order/getOrderDetail';
import { Order } from '@/types/order';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderDetailQuery = ({ id }: Pick<Order, 'id'>) => {
  const { data } = useQuery({
    queryKey: ['orderDetail', id],
    queryFn: () => getOrderDetail({ id }),
    enabled: !!id,
  });

  const orderDetails = data?.orderDetails || [];

  return { orderDetails };
};
