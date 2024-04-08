import { useNavigate } from '@tanstack/react-router';
import useAlertDialogStore from '@/store/alertDialogStore';
import useCartStore from '@/store/cartStore';
import { usePostOrderProductsMutation } from '@/hooks/mutations/usePostOrderProductsMutation';
import { CartProduct } from '@/types/cart';
import { OrderDetail } from '@/types/order';

interface CartPaymentsProps {
  totalQuantity: () => number;
  totalAmount: () => number;
  selectedProducts: CartProduct[];
}

export default function CartPayments({
  totalQuantity,
  totalAmount,
  selectedProducts,
}: CartPaymentsProps) {
  const navigate = useNavigate();

  const { mutate: postOrderProducts } = usePostOrderProductsMutation();

  const openAlertDialog = useAlertDialogStore.use.onOpen();
  const clearCart = useCartStore.use.clearCart();

  const convertCartProductsToOrderDetails = (
    cartProducts: CartProduct[]
  ): OrderDetail[] => {
    return cartProducts.map((cartProduct) => ({
      id: cartProduct.product.id,
      name: cartProduct.product.name,
      price: cartProduct.product.price,
      imageUrl: cartProduct.product.imageUrl,
      quantity: cartProduct.quantity ?? 1,
    }));
  };

  const handleOrderButtonClick = () => {
    openAlertDialog({
      title: '주문하기',
      message: '선택된 상품들을 주문하시겠습니까?',
      btnText: '확인',
      onConfirm: () => {
        postOrderProducts({
          orderDetails: convertCartProductsToOrderDetails(selectedProducts),
        });
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
