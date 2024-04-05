import { useState } from 'react';
import useCartStore from '@/store/cartStore';
import useAlertDialogStore from '@/store/alertDialogStore';
import { CartProduct } from '@/types/cart';
import { Product } from '@/types/product';
import {
  findProductById,
  removeProductById,
  updateProductQuantity,
} from '@/utils/cart';

interface CartProductsProps {
  selectedProducts: CartProduct[];
  selectProduct: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

const MIN_PRODUCT_COUNT = 1;
const MAX_PRODUCT_COUNT = 20;

export default function CartTable({
  selectedProducts,
  selectProduct,
}: CartProductsProps) {
  const [selection, setSelection] = useState<Set<number>>(new Set());

  const openAlertDialog = useAlertDialogStore.use.onOpen();
  const cart = useCartStore.use.cart();

  const increaseQuantity = useCartStore.use.increaseProductQuantity();
  const decreaseQuantity = useCartStore.use.decreaseProductQuantity();
  const removeProduct = useCartStore.use.removeProduct();
  const removeProducts = useCartStore.use.removeProducts();

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
    const targetProduct = findProductById(cart, productId);

    if ((targetProduct?.quantity ?? 0) >= MAX_PRODUCT_COUNT) {
      return;
    }

    increaseQuantity(productId);

    if (targetProduct) {
      selectProduct((prevProducts) =>
        updateProductQuantity(prevProducts, targetProduct, productId, 1)
      );
    }
  };

  const handleDecreaseQuantity = (productId: CartProduct['id']) => {
    const targetProduct = findProductById(cart, productId);

    if ((targetProduct?.quantity ?? 0) <= MIN_PRODUCT_COUNT) {
      return;
    }

    decreaseQuantity(productId);

    if (targetProduct) {
      selectProduct((prevProducts) =>
        updateProductQuantity(prevProducts, targetProduct, productId, -1)
      );
    }
  };

  const removeSelectedProduct = (productId: Product['id']) => {
    removeProduct(productId);
    selectProduct(removeProductById(selectedProducts, productId));
  };

  // 상품 제거 기능 추가하기
  const handleRemoveProduct = (productId: Product['id']) => {
    openAlertDialog({
      title: '알림',
      message: '상품을 삭제하시겠습니까?',
      btnText: '삭제하기',
      onConfirm: () => removeSelectedProduct(productId),
    });
  };

  const removeSelectedProducts = () => {
    removeProducts(selection);
    setSelection(new Set());
    selectProduct([]);
  };
  // 선택된 상품(들) 제거 기능 추가하기
  const handleRemoveSelectedProduct = () => {
    openAlertDialog({
      title: '알림',
      message: '선택된 모든 상품을 삭제하시겠습니까?',
      btnText: '삭제하기',
      onConfirm: removeSelectedProducts,
    });
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

            <button
              className='delete-button'
              onClick={handleRemoveSelectedProduct}
            >
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
                    <button onClick={() => handleRemoveProduct(productId)}>
                      <img
                        className='cart-trash-svg'
                        src='@/assets/svgs/trash.svg'
                        alt='삭제'
                      />
                    </button>
                    <div className='number-input-container'>
                      <input
                        type='number'
                        className='number-input'
                        value={quantity}
                        readOnly
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
