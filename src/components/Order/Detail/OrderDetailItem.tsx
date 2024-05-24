import { useNavigate } from '@tanstack/react-router';
import useCartStore from '@/store/cartStore';
import useAlertDialogStore from '@/store/alertDialogStore';
import { usePostCartProductMutation } from '@/hooks/mutations/usePostCartProductMutation';
import { checkProductExistInCart } from '@/utils/cart';
import { formatToKRW } from '@/utils/formatter';
import { OrderDetail } from '@/types/order';
import { Product } from '@/types/product';

interface OrderDetailItemProps {
  orderList: OrderDetail[];
}

export default function OrderDetailItem({ orderList }: OrderDetailItemProps) {
  const navigate = useNavigate();

  const cart = useCartStore.use.cart();

  const openAlertDialog = useAlertDialogStore.use.onOpen();

  const { mutate: postCartProduct } = usePostCartProductMutation();

  const handleCartClick = ({ id, name, price, imageUrl }: Product) => {
    const isProductExistInCart = checkProductExistInCart(cart, id);

    const dialogConfig = isProductExistInCart
      ? {
          message: '이미 장바구니에 있는 상품입니다.',
          btnText: '확인',
          onConfirm: () => {},
        }
      : {
          message: '장바구니에 상품이 담겼습니다.',
          btnText: '바로가기',
          onConfirm: () => navigate({ to: '/cart' }),
        };

    postCartProduct(
      { product: { id, name, price, imageUrl } },
      {
        onSuccess: () =>
          openAlertDialog({
            title: '알림',
            ...dialogConfig,
          }),
      }
    );
  };

  return (
    <>
      {orderList?.map(
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
            <button
              onClick={() => handleCartClick({ id, name, price, imageUrl })}
              className='primary-button-small flex-center self-start'
            >
              장바구니
            </button>
          </div>
        )
      )}
    </>
  );
}
