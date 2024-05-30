import { useNavigate } from '@tanstack/react-router';
import { flex, grid } from '@/styled-system/patterns';
import { css } from '@/styled-system/css';
import useCartStore from '@/store/cartStore';
import useAlertDialogStore from '@/store/alertDialogStore';
import Divider from '@components/common/Divider/Divider';
import { usePostCartProductMutation } from '@/hooks/mutations/usePostCartProductMutation';
import { checkProductExistInCart } from '@/utils/cart';
import { formatToKRW } from '@/utils/formatter';
import { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({
  product: { id, name, price, imageUrl },
}: ProductDetailProps) {
  const navigate = useNavigate();

  const openAlertDialog = useAlertDialogStore.use.onOpen();
  const cart = useCartStore.use.cart();

  const { mutate: postCartProduct } = usePostCartProductMutation();

  const handleCartClick = () => {
    const isProductExistInCart = checkProductExistInCart(cart, id);

    const dialogConfig = isProductExistInCart
      ? {
          message:
            '이미 장바구니에 있는 상품입니다.\n장바구니로 이동하시겠습니까?',
          btnText: '확인',
          onConfirm: () => navigate({ to: '/cart' }),
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
    <article
      className={grid({
        gridTemplateColumns: {
          base: 'repeat(1, minmax(0, 1fr))',
          md: 'repeat(2, minmax(0, 1fr))',
        },
        gap: {
          base: '20px',
          md: '100px',
        },
      })}
    >
      <figure
        className={css({
          outline: '1px solid #ddd',
          borderRadius: '4px',
        })}
      >
        <img
          className={css({
            width: '100%',
          })}
          src={imageUrl}
          alt={name}
        />
      </figure>

      <section
        className={flex({
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '4px',
        })}
      >
        <header
          className={flex({
            flexDirection: 'column',
            gap: '10px',
          })}
        >
          <span
            className={css({
              fontSize: 'xl',
              fontWeight: 'semibold',
            })}
          >
            {name}
          </span>
          {/* Divder */}
          <Divider color='lightGray' />
        </header>

        <div
          className={flex({
            flexDirection: 'column',
            gap: '20px',
          })}
        >
          <div
            className={flex({
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '40px',
            })}
          >
            <span
              className={css({
                fontSize: 'lg',
                fontWeight: '500',
              })}
            >
              금액
            </span>
            <span
              className={css({
                fontSize: 'lg',
                fontWeight: '600',
              })}
            >
              {formatToKRW(price)}
            </span>
          </div>

          <button
            onClick={handleCartClick}
            className={css({
              width: 'calc(100%)',
              backgroundColor: 'blue.400',
              height: 'auto',
              color: 'white',
              textAlign: 'center',
              padding: '10px 16px',
              borderRadius: 'md',
              fontSize: 'large',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            })}
          >
            장바구니
          </button>
        </div>
      </section>
    </article>
  );
}
