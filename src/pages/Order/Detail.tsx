import { useGetOrderDetailQuery } from '@/hooks/queries/useGetOrderDetailQuery';
import { Order } from '@/types/order';
import OrderListHeader from '@components/Order/OrderListHeader';
import OrderListItem from '@components/Order/OrderListItem';
import { formatToKRW } from '@/utils/formatter';
import { calculateTotalAmount } from '@/utils/order';

export default function Detail({ id }: Pick<Order, 'id'>) {
  const { orderDetails } = useGetOrderDetailQuery({ id });

  const totalAmount = calculateTotalAmount(orderDetails);

  if (!orderDetails) {
    return <>구매하신 내역이 없습니다.</>;
  }

  return (
    <section className='order-section'>
      <header className='flex-col-center mt-20'>
        <h2 className='order-section__title'>주문내역상세</h2>
        <hr className='divide-line mt-20' />
      </header>

      <div className='order-list'>
        <OrderListHeader id={id} />

        <OrderListItem orderList={orderDetails} />
      </div>

      <div className='order-detail-container'>
        <div className='w-480'>
          <span className='order-detail-title'>결제금액 정보</span>
          <hr className='divide-line-thin my-20' />
          <div className='flex justify-between'>
            <span className='highlight-text'>총 결제금액</span>
            <span className='highlight-text'>{formatToKRW(totalAmount)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
