import { useGetOrderDetailQuery } from '@/hooks/queries/useGetOrderDetailQuery';
import OrderTitle from '@components/Order/@common/OrderTitle';
import OrderHeader from '@components/Order/@common/OrderHeader';
import { formatToKRW } from '@/utils/formatter';
import { Order, OrderDetail } from '@/types/order';
import { calculateTotalAmount } from '@/utils/order';

interface OrderDetailPayload {
  id: Order['id'];
}

export default function OrderDetailPage({ id }: OrderDetailPayload) {
  const { orderDetails } = useGetOrderDetailQuery({ id });

  const totalAmount = calculateTotalAmount(orderDetails);

  return (
    <>
      <OrderTitle title='주문내역상세' />

      <div className='order-list'>
        <OrderHeader id={id} detailButton={false} />
        {orderDetails?.map(
          ({ id, name, price, imageUrl, quantity }: OrderDetail) => (
            <div key={id} className='order-list-item'>
              <div className='flex gap-15 mt-10'>
                <img className='w-144 h-144' src={imageUrl} alt={name} />
                <div className='flex-col gap-15'>
                  <span className='order-name'>{name}</span>
                  <span className='order-info'>
                    {`${formatToKRW(price * quantity)} / 수량: ${quantity}개`}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
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
    </>
  );
}
