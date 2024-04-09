import { useNavigate } from '@tanstack/react-router';
import { useGetOrdersQuery } from '@/hooks/queries/useGetOrdersQuery';
import { Order, OrderDetail } from '@/types/order';

export default function List() {
  const navigate = useNavigate({ from: '/orderList' });

  const { orders } = useGetOrdersQuery();

  const handleDetailsButtonClick = (orderId: string) => {
    navigate({
      to: '/orderList/$orderId',
      params: { orderId },
    });
  };

  return (
    <section className='order-section'>
      <header className='flex-col-center mt-20'>
        <h2 className='order-section__title'>주문 목록</h2>
        <hr className='divide-line mt-20' />
      </header>

      {orders?.map(({ id, orderDetails }: Order) => (
        <div key={id} className='order-list'>
          <div className='order-list__header'>
            <span>주문번호: {id}</span>
            <button onClick={() => handleDetailsButtonClick(String(id))}>
              <span>{`상세보기 >`}</span>
            </button>
          </div>

          {orderDetails.map(
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
      ))}
    </section>
  );
}
