import { useNavigate } from '@tanstack/react-router';
import useAlertDialogStore from '@/store/alertDialogStore';
import useCartStore from '@/store/cartStore';
import { usePostOrderProductsMutation } from '@/hooks/mutations/usePostOrderProductsMutation';
import { CartProduct } from '@/types/cart';
import { OrderDetail } from '@/types/order';
import {
  calculateTotalAmount,
  calculateTotalQuantity,
} from '@/utils/calculate';
import { formatToKRW } from '@/utils/formatter';

interface CartPaymentsProps {
  selectedProducts: CartProduct[];
}

export default function CartPayments({ selectedProducts }: CartPaymentsProps) {
  const navigate = useNavigate();

  const openAlertDialog = useAlertDialogStore.use.onOpen();
  const { clearCart } = useCartStore.use.actions();

  const { mutate: postOrderProducts } = usePostOrderProductsMutation({
    onSuccess: () => {
      clearCart();
      navigate({ to: '/order' });
    },
  });

  const handleOrderButtonClick = () => {
    openAlertDialog({
      title: '주문하기',
      message: '선택된 상품들을 주문하시겠습니까?',
      btnText: '확인',
      onConfirm: () => {
        postOrderProducts({
          orderDetails: selectedProducts.map(
            ({ product, quantity }: CartProduct): OrderDetail => ({
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: quantity ?? 1,
            })
          ),
        });
      },
    });
  };

  const totalAmount = calculateTotalAmount(selectedProducts);
  const totalQuantity = calculateTotalQuantity(selectedProducts);

  return (
    <>
      <div className='cart-right-section__top'>
        <h3 className='cart-title'>결제예상금액</h3>
      </div>
      <hr className='divide-line-thin' />
      <div className='cart-right-section__bottom'>
        <div className='flex justify-between p-20 mt-20'>
          <span className='highlight-text'>결제예상금액</span>
          <span className='highlight-text'>{formatToKRW(totalAmount)}</span>
        </div>
        <div className='flex-center mt-30 mx-10'>
          <button
            className='primary-button flex-center'
            onClick={handleOrderButtonClick}
            disabled={totalQuantity === 0}
          >
            {`주문하기(${totalQuantity}개)`}
          </button>
        </div>
      </div>
    </>
  );
}
