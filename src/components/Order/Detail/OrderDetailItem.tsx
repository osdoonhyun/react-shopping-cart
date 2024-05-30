import { useNavigate } from '@tanstack/react-router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
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
          <div key={id} className={orderListItem}>
            <div
              className={flex({
                gap: '15px',
                marginTop: '10px',
              })}
            >
              <img
                className={css({
                  width: {
                    base: '80px',
                    sm: '120px',
                  },
                  height: {
                    base: '80px',
                    sm: '120px',
                  },
                  flex: '1 0 120px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                })}
                src={imageUrl}
                alt={name}
              />
              <div
                className={flex({
                  flexDirection: 'column',
                })}
              >
                <span
                  className={css({
                    fontSize: {
                      base: '14px',
                      sm: '18px',
                    },
                  })}
                >
                  {name}
                </span>
                <span
                  className={css({
                    fontSize: {
                      base: '14px',
                      sm: '18px',
                    },
                    color: '#888888',
                  })}
                >
                  {`${formatToKRW(price * quantity)} / 수량: ${quantity}개`}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCartClick({ id, name, price, imageUrl })}
              className={css({
                backgroundColor: 'blue.400',
                fontSize: '18px',
                color: 'white',
                padding: '8px 18px',
                cursor: 'pointer',
                alignSelf: 'self-start',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              })}
            >
              장바구니
            </button>
          </div>
        )
      )}
    </>
  );
}

const orderListItem = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '20px 40px',
  border: '1px solid #aaaaaa',
});
