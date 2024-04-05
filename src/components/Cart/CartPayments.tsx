import { useNavigate } from '@tanstack/react-router';
import useAlertDialogStore from '@/store/alertDialogStore';
import useCartStore from '@/store/cartStore';

interface CartPaymentsProps {
  totalQuantity: () => number;
  totalAmount: () => number;
}

export default function CartPayments({
  totalQuantity,
  totalAmount,
}: CartPaymentsProps) {
  const navigate = useNavigate();

  const openAlertDialog = useAlertDialogStore.use.onOpen();
  const clearCart = useCartStore.use.clearCart();

  const handleOrderButtonClick = () => {
    openAlertDialog({
      title: '주문하기',
      message: '선택된 상품들을 주문하시겠습니까?',
      btnText: '확인',
      onConfirm: () => {
        clearCart();
        navigate({ to: '/order' });
      },
    });
  };

  return (
    <>
      <div className='cart-right-section__top'>
        <h3 className='cart-title'>결제예상금액</h3>
      </div>
      <hr className='divide-line-thin' />
      <div className='cart-right-section__bottom'>
        <div className='flex justify-between p-20 mt-20'>
          <span className='highlight-text'>결제예상금액</span>
          <span className='highlight-text'>{`${totalAmount()}원`}</span>
        </div>
        <div className='flex-center mt-30 mx-10'>
          <button
            className='primary-button flex-center'
            onClick={handleOrderButtonClick}
          >
            {`주문하기(${totalQuantity()}개)`}
          </button>
        </div>
      </div>
    </>
  );
}
