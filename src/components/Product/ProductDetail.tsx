import { useNavigate } from '@tanstack/react-router';
import { Product } from '@/types/product';
import { usePostCartProductMutation } from '@/hooks/mutations/usePostCartProductMutation';
import useAlertDialogStore from '@/store/alertDialogStore';
import useCartStore from '@/store/cartStore';
import { checkProductExistInCart } from '@/utils/cart';
import { formatToKRW } from '@/utils/formatter';

export default function ProductDetail({ id, name, price, imageUrl }: Product) {
  const navigate = useNavigate();

  const { mutate: postCartProduct } = usePostCartProductMutation();

  const openAlertDialog = useAlertDialogStore.use.onOpen();
  const cart = useCartStore.use.cart();

  const handleCartClick = () => {
    const isProductExistInCart = checkProductExistInCart(cart, id);

    // 상품 존재 여부에 따라 메시지, 버튼 텍스트, 확인 액션을 설정
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
    <div className='product-detail-container'>
      <div className='flex-col-center w-520'>
        <img className='w-480 h-480 mb-10' src={imageUrl} alt={name} />
        <div className='product-detail-info'>
          <span className='product-detail-info__name'>{name}</span>
          <hr className='divide-line-gray my-20' />
          <div className='flex justify-between'>
            <span>금액</span>
            <span className='product-detail-info__price'>
              {formatToKRW(price)}
            </span>
          </div>
        </div>
        <button
          onClick={handleCartClick}
          className='product-detail-button flex-center mt-20'
        >
          장바구니
        </button>
      </div>
    </div>
  );
}
