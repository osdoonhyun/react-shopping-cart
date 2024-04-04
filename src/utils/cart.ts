import { CartProduct } from '@/types/cart';

/**
 * 상품의 수량을 업데이트합니다.
 * @param {Array} cartProducts - 장바구니 목록
 * @param {Object} targetProduct - 업데이트할 대상 상품
 * @param {number} targetProductId - 업데이트할 대상 상품ID
 * @param {number} updateValue - 업데이트할 수량 값 (-1 또는 1)
 * @returns 업데이트된 장바구니 목록
 */
export const updateProductQuantity = (
  cartProducts: CartProduct[],
  targetProduct: CartProduct,
  targetProductId: CartProduct['id'],
  updateValue: -1 | 1
) => {
  return cartProducts.map((product) =>
    product.product.id === targetProductId
      ? {
          ...product,
          quantity: (targetProduct.quantity ?? 0) + updateValue,
        }
      : product
  );
};

/**
 * 상품을 ID로 찾아 반환합니다.
 * @param {number} cartProducts - 장바구니 목록
 * @param {number} productId - 찾고자 하는 상품의 ID
 * @returns 찾은 상품 또는 undefined
 */
export const findProductById = (
  cartProducts: CartProduct[],
  productId: CartProduct['id']
) => {
  return cartProducts.find(({ product }) => product.id === productId);
};
