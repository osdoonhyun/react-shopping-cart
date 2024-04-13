import { useNavigate } from '@tanstack/react-router';
import { useGetOrderResultQuery } from '@/hooks/queries/useGetOrderResultQuery';
import useAlertDialog from '@/store/alertDialogStore';
import OrderTitle from '@components/Order/@common/OrderTitle';
import OrderResultPayments from '@components/Order/Result/OrderResultPayments';
import OrderResultHeader from '@components/Order/Result/OrderResultHeader';
import OrderResultItem from '@components/Order/Result/OrderResultItem';
import { OrderDetail } from '@/types/order';
import { calculateTotalAmount } from '@/utils/order';

export default function OrderResultPage() {
  const navigate = useNavigate();

  const openAlertDialog = useAlertDialog.use.onOpen();

  const { orderResult } = useGetOrderResultQuery();

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

  const totalAmount = calculateTotalAmount(orderResult);

  const orderCount = orderResult?.length ?? 0;

  return (
    <section className='order-section'>
      <OrderTitle title='주문/결제' />

      <div className='flex'>
        <section className='order-left-section'>
          <OrderResultHeader orderCount={orderCount} />

          {orderCount > 0 ? (
            orderResult.map((orderDetail: OrderDetail) => (
              <OrderResultItem key={orderDetail.id} orderDetail={orderDetail} />
            ))
          ) : (
            <div className='cart-empty'>
              <p className='cart-empty-message'>결제하신 내역이 없습니다.</p>
            </div>
          )}
        </section>

        <section className='order-right-section'>
          <OrderResultPayments
            totalAmount={totalAmount}
            onPaymentButtonClick={handlePaymentButtonClick}
          />
        </section>
      </div>
    </section>
  );
}
