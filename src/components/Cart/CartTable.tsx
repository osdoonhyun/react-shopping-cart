import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import useCartStore from '@/store/cartStore';
import { CartProduct } from '@/types/cart';

interface CartProductsProps {
  cartProducts: CartProduct[];
  selectProduct: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

export default function CartTable({
  cartProducts,
  selectProduct,
}: CartProductsProps) {
  const [selection, setSelection] = useState(new Set());

  const cart = useCartStore.use.cart();

  const handleSelectChange = (id: number) => {
    const newSelection = new Set(selection);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelection(newSelection);
    selectProduct(
      cartProducts.filter((product) => newSelection.has(product.product.id))
    );
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const allCheckedSelection = new Set(
        cartProducts.map((cartProduct) => cartProduct.product.id)
      );
      setSelection(allCheckedSelection);
      selectProduct(cartProducts);
    } else {
      setSelection(new Set());
      selectProduct([]);
    }
  };

  const isSelectedAll = () => {
    return selection.size === cartProducts?.length;
  };

  return (
    <>
      {/* CartToolBar */}
      <div className='flex justify-between items-center'>
        {cart?.length > 0 && (
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

            <button className='delete-button'>상품삭제</button>
          </>
        )}
      </div>

      {/* CartProductsHeader */}
      <h3 className='cart-title'>{`든든배송 상품(${cart?.length ?? 0}개)`}</h3>
      <hr className='divide-line-gray mt-10' />

      {cartProducts?.length > 0 ? (
        cartProducts?.map(
          ({ product: { id, name, price, imageUrl } }: CartProduct) => (
            <Fragment key={id}>
              <div className='cart-container'>
                <div className='flex gap-15 mt-10'>
                  <input
                    className='checkbox'
                    name='checkbox'
                    type='checkbox'
                    checked={selection.has(id)}
                    onChange={() => handleSelectChange(id)}
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
                    <input type='number' className='number-input' value='1' />
                    <div>
                      <button className='number-input-button'>▲</button>
                      <button className='number-input-button'>▼</button>
                    </div>
                  </div>
                  <span className='cart-price'>{price}원</span>
                </div>
              </div>
              <hr className='divide-line-thin mt-10' />
            </Fragment>
          )
        )
      ) : (
        <div className='cart-empty'>
          <p className='cart-empty-message'>장바구니에 담긴 상품이 없습니다.</p>
        </div>
      )}
    </>
  );
}
