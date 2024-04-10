import { Order } from '@/types/order';
import OrderDetailItem from '../Detail/OrderDetailItem';
import OrderDetailHeader from '../Detail/OrderDetailHeader';

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  return (
    <>
      {orders.map(({ id, orderDetails }: Order) => (
        <div key={id} className='order-list'>
          <OrderDetailHeader id={id} detailButton />

          <OrderDetailItem orderList={orderDetails} />
        </div>
      ))}
    </>
  );
}
