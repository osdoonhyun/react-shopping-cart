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
    <li>
      <div className='cart-container'>
        <div className='flex gap-15 mt-10'>
          <input
            className='checkbox'
            name='checkbox'
            type='checkbox'
            checked={isSelected}
            onChange={() => onToggleSelection(productId)}
          />
          <img className='w-144 h-144' src={imageUrl} alt={name} />
          <span className='cart-name'>{name}</span>
        </div>
        <div className='flex-col-center justify-end gap-15'>
          <button onClick={() => onRemoveProduct(productId)}>
            <img className='cart-trash-svg' src={trashImg} alt='삭제' />
          </button>
          <div className='number-input-container'>
            <input
              type='number'
              className='number-input'
              value={quantity}
              readOnly
            />
            {quantity && (
              <div>
                <button
                  className='number-input-button'
                  onClick={() => onIncreaseQuantity(productId)}
                  disabled={quantity >= MAX_QUANTITY}
                >
                  ▲
                </button>
                <button
                  className='number-input-button'
                  onClick={() => onDecreaseQuantity(productId)}
                  disabled={quantity <= MIN_QUANTITY}
                >
                  ▼
                </button>
              </div>
            )}
          </div>
          <span className='cart-price'>
            {formatToKRW(price * (quantity ?? 1))}
          </span>
        </div>
      </div>
      <hr className='divide-line-thin mt-10' />
    </li>
  );
}
