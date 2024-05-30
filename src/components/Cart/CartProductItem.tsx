import { flex } from '@/styled-system/patterns';
import { css } from '@/styled-system/css';
import { CartProduct } from '@/types/cart';
import { formatToKRW } from '@/utils/formatter';
import trashImg from '@/assets/svgs/trash.svg';
import { MAX_QUANTITY, MIN_QUANTITY } from '@/constants/cart';

interface CartProductItemProps {
  cartProduct: CartProduct;
  isSelected: boolean;
  onToggleSelection: (productId: number) => void;
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
  onRemoveProduct: (productId: number) => void;
}

export default function CartProductItem({
  cartProduct,
  isSelected,
  onToggleSelection,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveProduct,
}: CartProductItemProps) {
  const {
    product: { id: productId, name, price, imageUrl },
    quantity,
  } = cartProduct;

  return (
    <li className={flex({ gap: '10px' })}>
      <div
        className={flex({
          justifyContent: 'row',
          alignItems: 'center',
          gap: '10px',
        })}
      >
        <input
          className={css({
            appearance: 'none',
            width: '18px',
            height: '18px',
            border: '1px solid #ccc',
            outline: 'none',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease-in-out',

            '&:checked': {
              borderColor: 'blue.500',
              backgroundColor: 'blue.500',
            },

            '& + span': {
              marginLeft: '8px',
            },

            '&:checked::after': {
              content: '""',
              display: 'block',
              width: '5px',
              height: '10px',
              border: 'solid white',
              borderWidth: '0 2px 2px 0',
              transform: 'rotate(45deg)',
              marginLeft: '6px',
              marginTop: '2px',
            },
          })}
          name='checkbox'
          type='checkbox'
          checked={isSelected}
          onChange={() => onToggleSelection(productId)}
        />
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
            flex: '1 0 120px !important',
            objectFit: 'cover',
            borderRadius: '4px',
            border: 'none',
          })}
          src={imageUrl}
          alt={name}
        />
      </div>

      <div
        className={flex({
          position: 'relative',
          flex: '1 0 0',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: {
            base: '4px',
            sm: '10px',
          },
        })}
      >
        <span
          className={css({
            fontSize: {
              base: '14px',
              sm: '18px',
            },
            paddingRight: '12px',
          })}
        >
          {name}
        </span>
        <div
          className={flex({
            flexDirection: 'column',
            justifyContent: 'space-between',
          })}
        >
          <div
            className={flex({
              flexDirection: 'row',
              justifyContent: 'flex-end',
            })}
          >
            <button onClick={() => onRemoveProduct(productId)}>
              <img className='cart-trash-svg' src={trashImg} alt='삭제' />
            </button>
          </div>

          <div
            className={flex({
              position: {
                base: 'absolute',
                sm: 'static',
              },
              bottom: {
                base: '4px',
                sm: 'unset',
              },
              left: {
                base: '0',
                sm: 'unset',
              },
              width: '100%',
              paddingLeft: {
                base: '4px',
                sm: '0',
              },
              flexDirection: {
                base: 'row',
                sm: 'column',
              },
              alignItems: 'flex-end',
              justifyContent: {
                base: 'space-between',
                sm: 'flex-start',
              },
              gap: '10px',
            })}
          >
            <div
              className={flex({
                gap: '2px',
                justifyContent: {
                  base: 'flex-start',
                  sm: 'flex-end',
                },
                alignItems: 'center',
                width: {
                  base: '150px',
                  sm: '100%',
                },
                overflow: {
                  base: 'hidden',
                  sm: 'visible',
                },
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
                {formatToKRW(price * (quantity ?? 1))}
              </span>
            </div>

            {/* COUNTER */}
            {quantity && (
              <div
                className={flex({
                  width: '100px',
                  height: '30px',
                })}
              >
                <button
                  className={flex({
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#aaa',
                    border: '1px solid #d1d1d1',
                    padding: '6px',
                    width: '100%',
                  })}
                  onClick={() => onDecreaseQuantity(productId)}
                  disabled={quantity <= MIN_QUANTITY}
                >
                  -
                </button>
                <input
                  type='number'
                  className={flex({
                    width: '40px',
                    height: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #d1d1d1',
                    borderLeft: 'none',
                    borderRight: 'none',
                    padding: 0,
                    textAlign: 'center',
                    color: 'gray.500',
                  })}
                  value={quantity}
                  readOnly
                />
                <button
                  className={flex({
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    color: '#aaa',
                    border: '1px solid #d1d1d1',
                    padding: '6px',
                  })}
                  onClick={() => onIncreaseQuantity(productId)}
                  disabled={quantity >= MAX_QUANTITY}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
