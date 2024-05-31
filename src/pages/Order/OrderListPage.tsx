import { useGetOrdersQuery } from '@/hooks/queries/useGetOrdersQuery';
import OrderTitle from '@components/Order/@common/OrderTitle';
import OrderList from '@components/Order/List/OrderList';

export default function OrderListPage() {
  const { orders } = useGetOrdersQuery();

  return (
    <section>
      <OrderTitle title='주문 목록' />

      <OrderList orders={orders} />
    </section>
  );
}
