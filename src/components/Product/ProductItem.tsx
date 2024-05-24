import { MouseEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { usePostCartProductMutation } from '@/hooks/mutations/usePostCartProductMutation';
import { Product } from '@/types/product';
import { formatToKRW } from '@/utils/formatter';
import cartImg from '@/assets/svgs/cart.svg';
import useCartStore from '@/store/cartStore';
import useAlertDialogStore from '@/store/alertDialogStore';
import { checkProductExistInCart } from '@/utils/cart';

interface ProductItemProps extends Product {}

export default function ProductItem({
  id,
  name,
  imageUrl,
  price,
}: ProductItemProps) {
  const navigate = useNavigate({ from: '/list' });

  const openAlertDialog = useAlertDialogStore.use.onOpen();

  const cart = useCartStore.use.cart();

  const { mutate: postCartProduct } = usePostCartProductMutation();

  const handleClickProductItem = (productId: string) => {
    navigate({ to: '/list/$productId', params: { productId } });
  };

  const handleCartClick = (event: MouseEvent) => {
    event.stopPropagation();

    const isProductExistInCart = checkProductExistInCart(cart, id);

    const dialogConfig = isProductExistInCart
      ? {
          message:
            '이미 장바구니에 있는 상품입니다.\n장바구니로 이동하시겠습니까?',
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
    <li
      className='product-item-box'
      onClick={() => handleClickProductItem(String(id))}
    >
      <img src={imageUrl} alt={name} />
      <div className='flex justify-between p-5'>
        <div className='product-info'>
          <span className='product-info__name'>{name}</span>
          <span className='product-info__price'>{formatToKRW(price)}</span>
        </div>
        <button className='cart-svg' onClick={handleCartClick}>
          <img src={cartImg} alt='장바구니' />
        </button>
      </div>
    </li>
  );
}
