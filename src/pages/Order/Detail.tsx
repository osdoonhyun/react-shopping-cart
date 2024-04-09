import { useGetOrderDetailQuery } from '@/hooks/queries/useGetOrderDetailQuery';
import { Order, OrderDetail } from '@/types/order';

export default function Detail({ id }: Pick<Order, 'id'>) {
  const { orderDetails } = useGetOrderDetailQuery({ id });

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
        <div className='order-list__header'>
          <span>주문번호: {id}</span>
          <span>{`상세보기 >`}</span>
        </div>

        {orderDetails?.map(
          ({ id, name, price, imageUrl, quantity }: OrderDetail) => (
            <div key={id} className='order-list-item'>
              <div className='flex gap-15 mt-10'>
                <img className='w-144 h-144' src={imageUrl} alt={name} />
                <div className='flex-col gap-15'>
                  <span className='order-name'>{name}</span>
                  <span className='order-info'>
                    {price}원 / 수량: {quantity}개
                  </span>
                </div>
              </div>
              <button className='primary-button-small flex-center self-start'>
                장바구니
              </button>
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
            <span className='highlight-text'>325,600원</span>
          </div>
        </div>
      </div>
    </section>
  );
}
