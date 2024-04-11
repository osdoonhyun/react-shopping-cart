import { CartProduct } from '@/types/cart';
import CartProductItem from './CartProductItem';

interface CartProductsProps {
  hasProducts: boolean;
  cartProducts: CartProduct[];
  selectionProducts: Set<number>;
  onToggleSelection: (productId: CartProduct['id']) => void;
  onIncreaseQuantity: (productId: CartProduct['id']) => void;
  onDecreaseQuantity: (productId: CartProduct['id']) => void;
  onRemoveProduct: (productId: CartProduct['id']) => void;
}

export default function CartProducts({
  hasProducts,
  cartProducts,
  selectionProducts,
  onToggleSelection,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveProduct,
}: CartProductsProps) {
  return (
    <>
      {hasProducts ? (
        <ul>
          {cartProducts.map((cartProduct) => (
            <CartProductItem
              key={cartProduct.id}
              cartProduct={cartProduct}
              isSelected={selectionProducts.has(cartProduct.product.id)}
              onToggleSelection={onToggleSelection}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
              onRemoveProduct={onRemoveProduct}
            />
          ))}
        </ul>
      ) : (
        <div className='cart-empty'>
          <p className='cart-empty-message'>장바구니에 담긴 상품이 없습니다.</p>
        </div>
      )}
    </>
  );
}
