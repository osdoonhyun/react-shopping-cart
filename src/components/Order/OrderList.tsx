import { Order } from '@/types/order';
import OrderListItem from './OrderListItem';
import OrderListHeader from './OrderListHeader';

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  return (
    <>
      {orders.map(({ id, orderDetails }: Order) => (
        <div key={id} className='order-list'>
          <OrderListHeader id={id} detailButton />

          <OrderListItem orderList={orderDetails} />
        </div>
      ))}
    </>
  );
}
