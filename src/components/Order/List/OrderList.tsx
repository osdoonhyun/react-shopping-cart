import { Order } from '@/types/order';
import OrderDetailItem from '../Detail/OrderDetailItem';
import OrderHeader from '../@common/OrderHeader';

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  const isExistingOrders = !orders || orders.length > 0;
  return (
    <>
      {isExistingOrders ? (
        <>
          {orders?.map(({ id, orderDetails }: Order) => (
            <div key={id} className='order-list'>
              <OrderHeader id={id} detailButton />

              <OrderDetailItem orderList={orderDetails} />
            </div>
          ))}
        </>
      ) : (
        <div className='order-empty'>
          <p className='order-empty-message'>주문 내역이 없습니다.</p>
        </div>
      )}
    </>
  );
}
