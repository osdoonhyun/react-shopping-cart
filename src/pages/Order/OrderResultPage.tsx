import { useGetOrdersQuery } from '@/hooks/queries/useGetOrdersQuery';
import useAlertDialog from '@/store/alertDialogStore';
import { OrderDetail } from '@/types/order';
import { formatToKRW } from '@/utils/formatter';
import { calculateTotalAmount } from '@/utils/order';
import { useNavigate } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

export default function OrderResultPage() {
  const navigate = useNavigate();

  const { orders } = useGetOrdersQuery();

  const openAlertDialog = useAlertDialog.use.onOpen();

  const orderProducts = orders?.[0]?.orderDetails;

  const totalAmount = calculateTotalAmount(orderProducts);

  const handlePaymentButtonClick = () => {
    openAlertDialog({
      title: '결제하기',
      message: '주문하신 상품들을 결제하시겠습니까?',
      btnText: '확인',
      onConfirm: () => {
        navigate({ to: '/orderList' });
      },
    });
  };

  return (
    <section className='order-section'>
      <header className='flex-col-center mt-20'>
        <h2 className='order-section__title'>주문/결제</h2>
        <hr className='divide-line mt-20' />
      </header>

      <div className='flex'>
        <section className='order-left-section'>
          <h3 className='order-title'>{`주문 상품(${orderProducts?.length ?? 0}건)`}</h3>
          <hr className='divide-line-gray mt-10' />
          {orderProducts?.map(
            ({ id, name, imageUrl, quantity }: OrderDetail) => (
              <Fragment key={id}>
                <div className='order-container'>
                  <div className='flex gap-15 mt-10'>
                    <img className='w-144 h-144' src={imageUrl} alt={name} />
                    <div className='flex-col gap-15'>
                      <span className='order-name'>{name}</span>
                      <span>{`수량: ${quantity}`}</span>
                    </div>
                  </div>
                </div>
                <hr className='divide-line-thin mt-10' />
              </Fragment>
            )
          )}
        </section>

        <section className='order-right-section'>
          {/* OrderResultPayments */}
          <div className='order-right-section__top'>
            <h3 className='order-title'>결제금액</h3>
          </div>
          <hr className='divide-line-thin' />
          <div className='order-right-section__bottom'>
            <div className='flex justify-between p-20 mt-20'>
              <span className='highlight-text'>총 결제금액</span>
              <span className='highlight-text'>{formatToKRW(totalAmount)}</span>
            </div>
            <div className='flex-center mt-30 mx-10'>
              <button
                className='primary-button flex-center'
                onClick={handlePaymentButtonClick}
              >
                {`${formatToKRW(totalAmount)} 결제하기`}
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
