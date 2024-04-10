import { useGetOrdersQuery } from '@/hooks/queries/useGetOrdersQuery';
import OrderList from '@components/Order/List/OrderList';

export default function OrderListPage() {
  const { orders } = useGetOrdersQuery();

  return (
    <section className='order-section'>
      <header className='flex-col-center mt-20'>
        <h2 className='order-section__title'>주문 목록</h2>
        <hr className='divide-line mt-20' />
      </header>

      <OrderList orders={orders} />
    </section>
  );
}
