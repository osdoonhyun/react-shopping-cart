import { useNavigate } from '@tanstack/react-router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import useAlertDialogStore from '@/store/alertDialogStore';
import useCartStore from '@/store/cartStore';
import useOrderStore from '@/store/orderStore';
import { usePostOrderProductsMutation } from '@/hooks/mutations/usePostOrderProductsMutation';
import Divider from '@components/common/Divider/Divider';
import Title from '@components/common/Title/Title';
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

  const removeProducts = useCartStore.use.removeProducts();

  const addOrder = useOrderStore.use.addOrder();

  const moveToOrderResult = (id: number) => {
    navigate({
      to: '/order/$id',
      params: { id: String(id) },
    });
  };

  const { mutate: postOrderProducts } = usePostOrderProductsMutation({});

  const handleOrderButtonClick = () => {
    openAlertDialog({
      title: '주문하기',
      message: '선택된 상품들을 주문하시겠습니까?',
      btnText: '확인',
      onConfirm: () => {
        postOrderProducts(
          {
            orderDetails: selectedProducts.map(
              ({ product, quantity }: CartProduct): OrderDetail => ({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: quantity ?? 1,
              })
            ),
          },
          {
            onSuccess: (newOrder) => {
              // 1. 선택된 상품들의 id 추출
              const selectedIds = selectedProducts.map(
                ({ product }) => product.id
              );

              // 2. 새로 생성된 주문 주문 목록에 추가
              addOrder(newOrder);
              // 3. 선택한 상품들 장바구니에서 삭제
              removeProducts(selectedIds);
              // 4. OrderResult 페이지로 이동
              moveToOrderResult(newOrder.id);
            },
          }
        );
      },
    });
  };

  const totalAmount = calculateTotalAmount(selectedProducts);
  const totalQuantity = calculateTotalQuantity(selectedProducts);

  return (
    <>
      <div
        className={flex({
          flexDirection: 'column',
          padding: '20px',
          gap: '20px',
        })}
      >
        <div
          className={flex({
            display: {
              base: 'none',
              lg: 'block',
            },
            flexDirection: 'column',
          })}
        >
          <Title as='h3' variant='subtitle'>
            결제예상금액
          </Title>
          <Divider color='lightGray' />
        </div>

        <div
          className={flex({
            flexDirection: 'row',
            justifyContent: 'space-between',
          })}
        >
          <span className='highlight-text'>결제예상금액</span>
          <span className='highlight-text'>{formatToKRW(totalAmount)}</span>
        </div>
      </div>

      <button
        className={css({
          width: '100%',
          height: 'auto',
          textAlign: 'center',
          padding: '10px 16px',
          fontSize: 'subtitle',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          backgroundColor: 'blue.400',
          color: 'white',
          _disabled: {
            opacity: 0.6,
            cursor: 'not-allowed',
          },
        })}
        onClick={handleOrderButtonClick}
        disabled={totalQuantity === 0}
      >
        {`주문하기(${totalQuantity}개)`}
      </button>
    </>
  );
}
