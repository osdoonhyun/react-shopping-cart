import { useState } from 'react';
import useCartStore from '@/store/cartStore';
import { CartProduct } from '@/types/cart';

interface CartProductsProps {
  selectProduct: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

export default function CartTable({ selectProduct }: CartProductsProps) {
  const [selection, setSelection] = useState(new Set());

  const cart = useCartStore.use.cart();

  const increaseQuantity = useCartStore.use.increaseProductQuantity();
  const decreaseQuantity = useCartStore.use.decreaseProductQuantity();

  const handleSelectChange = (id: number) => {
    const newSelection = new Set(selection);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelection(newSelection);
    selectProduct(
      cart.filter((product) => newSelection.has(product.product.id))
    );
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const allCheckedSelection = new Set(
        cart.map((cartProduct) => cartProduct.product.id)
      );
      setSelection(allCheckedSelection);
      selectProduct(cart);
    } else {
      setSelection(new Set());
      selectProduct([]);
    }
  };

  const isSelectedAll = () => {
    return selection.size === cart?.length;
  };

  const handleIncreaseQuantity = (productId: CartProduct['id']) => {
    increaseQuantity(productId);

    const updatedProduct = cart.find(
      (product) => product.product.id === productId
    );

    if (updatedProduct) {
      selectProduct((prevProducts) =>
        prevProducts.map((product) =>
          product.product.id === productId
            ? { ...product, quantity: (updatedProduct.quantity ?? 0) + 1 }
            : product
        )
      );
    }
  };

  const handleDecreaseQuantity = (productId: CartProduct['id']) => {
    decreaseQuantity(productId);

    const updatedProduct = cart.find(
      (product) => product.product.id === productId
    );

    if (updatedProduct) {
      selectProduct((prevProducts) =>
        prevProducts.map((product) =>
          product.product.id === productId
            ? { ...product, quantity: (updatedProduct.quantity ?? 0) - 1 }
            : product
        )
      );
    }
  };

  // TODO: 상품 제거 기능 추가하기
  const handleRemoveProduct = () => {
    console.log('상품제거');
  };

  return (
    <>
      {/* CartToolBar */}
      <div className='flex justify-between items-center'>
        {cart.length > 0 && (
          <>
            <div className='checkbox-container'>
              <input
                className='checkbox'
                name='checkbox'
                type='checkbox'
                checked={isSelectedAll()}
                onChange={handleSelectAllChange}
              />
              <label className='checkbox-label' htmlFor='checkbox'>
                {isSelectedAll() ? '선택해제' : '전체선택'}
              </label>
            </div>

            <button className='delete-button' onClick={handleRemoveProduct}>
              상품삭제
            </button>
          </>
        )}
      </div>

      {/* CartProductsHeader */}
      <h3 className='cart-title'>{`든든배송 상품(${cart?.length ?? 0}개)`}</h3>
      <hr className='divide-line-gray mt-10' />

      {/* CartProdcuts */}
      {cart.length > 0 ? (
        <ul>
          {cart.map(
            ({
              id,
              product: { id: productId, name, price, imageUrl },
              quantity,
            }: CartProduct) => (
              <li key={id}>
                <div className='cart-container'>
                  <div className='flex gap-15 mt-10'>
                    <input
                      className='checkbox'
                      name='checkbox'
                      type='checkbox'
                      checked={selection.has(productId)}
                      onChange={() => handleSelectChange(productId)}
                    />
                    <img className='w-144 h-144' src={imageUrl} alt={name} />
                    <span className='cart-name'>{name}</span>
                  </div>
                  <div className='flex-col-center justify-end gap-15'>
                    <img
                      className='cart-trash-svg'
                      src='@/assets/svgs/trash.svg'
                      alt='삭제'
                    />
                    <div className='number-input-container'>
                      <input
                        type='number'
                        className='number-input'
                        value={quantity}
                      />
                      <div>
                        <button
                          className='number-input-button'
                          onClick={() => handleIncreaseQuantity(productId)}
                        >
                          ▲
                        </button>
                        <button
                          className='number-input-button'
                          onClick={() => handleDecreaseQuantity(productId)}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                    <span className='cart-price'>{price}원</span>
                  </div>
                </div>
                <hr className='divide-line-thin mt-10' />
              </li>
            )
          )}
        </ul>
      ) : (
        <div className='cart-empty'>
          <p className='cart-empty-message'>장바구니에 담긴 상품이 없습니다.</p>
        </div>
      )}
    </>
  );
}
