import { useNavigate } from '@tanstack/react-router';
import { flex } from '@/styled-system/patterns';
import { css } from '@/styled-system/css';
import { useGetOrderDetailQuery } from '@/hooks/queries/useGetOrderDetailQuery';
import useAlertDialog from '@/store/alertDialogStore';
import OrderTitle from '@components/Order/@common/OrderTitle';
import OrderResultPayments from '@components/Order/Result/OrderResultPayments';
import OrderResultHeader from '@components/Order/Result/OrderResultHeader';
import OrderResultItem from '@components/Order/Result/OrderResultItem';
import { Order, OrderDetail } from '@/types/order';
import { calculateTotalAmount } from '@/utils/order';

interface OrderResultPayload {
  id: Order['id'];
}

export default function OrderResultPage({ id }: OrderResultPayload) {
  const navigate = useNavigate();

  const openAlertDialog = useAlertDialog.use.onOpen();

  const { orderDetails: orderResult } = useGetOrderDetailQuery({ id });

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
    <section
      className={flex({
        flexDirection: 'column',
        paddingBottom: '60px',
        gap: '20px',
      })}
    >
      <OrderTitle title='주문/결제' />

      <div
        className={flex({
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '50px',
        })}
      >
        <section
          className={flex({
            flexDirection: 'column',
            gap: '20px',
            padding: '0',
            flexGrow: 1,
          })}
        >
          <OrderResultHeader orderCount={orderCount} />

          <ul
            className={flex({
              flexDirection: 'column',
              gap: '20px',
            })}
          >
            {orderCount > 0 ? (
              orderResult.map((orderDetail: OrderDetail) => (
                <OrderResultItem
                  key={orderDetail.id}
                  orderDetail={orderDetail}
                />
              ))
            ) : (
              <div className='cart-empty'>
                <p className='cart-empty-message'>결제하신 내역이 없습니다.</p>
              </div>
            )}
          </ul>
        </section>

        <section
          className={css({
            position: {
              base: 'fixed',
              lg: 'static',
            },
            bottom: {
              base: '0',
              lg: 'auto',
            },
            left: {
              base: '0',
              lg: 'auto',
            },
            width: {
              base: '100%',
              lg: '280px',
            },
            minWidth: '375px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '10px',
            border: '1px solid #d1d1d1',
            borderRadius: '4px',
            backgroundColor: 'white',
          })}
        >
          <OrderResultPayments
            totalAmount={totalAmount}
            onPaymentButtonClick={handlePaymentButtonClick}
          />
        </section>
      </div>
    </section>
  );
}
