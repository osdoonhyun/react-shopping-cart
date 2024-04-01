import create from 'zustand';
import createSelectors from '@/store/selectors';
import { CartProductWithQuantity } from '@/types/product';

interface cartState {
  cart: CartProductWithQuantity[];

  addToCart: (product: CartProductWithQuantity) => void; // 상품 추가
}

const useCartStoreBase = create<cartState>()((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const isProductExist = state.cart.some(
        (item) => item.product.id === product.product.id
      );

      if (isProductExist) {
        alert('이미 장바구니에 있는 상품입니다.');
        return { cart: [...state.cart] };
      } else {
        const newProduct = { ...product, quantity: 1, selected: false };

        return { cart: [...state.cart, newProduct] };
      }
    }),
}));

export default createSelectors(useCartStoreBase);
