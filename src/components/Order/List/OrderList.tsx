import { Order } from '@/types/order';
import OrderDetailItem from '../Detail/OrderDetailItem';
import OrderHeader from '../@common/OrderHeader';

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  return (
    <>
      {orders?.map(({ id, orderDetails }: Order) => (
        <div key={id} className='order-list'>
          <OrderHeader id={id} detailButton />

          <OrderDetailItem orderList={orderDetails} />
        </div>
      ))}
    </>
  );
}
