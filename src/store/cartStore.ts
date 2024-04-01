import create from 'zustand';
import createSelectors from '@/store/selectors';
import { CartProduct, CartProductWithSelection } from '@/types/cart';

interface cartState {
  cart: CartProductWithSelection[];

  addToCart: (product: CartProduct) => void; // 상품 추가
  removeProduct: (productId: CartProduct['id']) => void;
  toggleProduct: (productId: CartProduct['id']) => void;
  increaseProductQuantity: (productId: CartProduct['id']) => void;
  decreaseProductQuantity: (productId: CartProduct['id']) => void;
  selectAllProducts: () => void;
  unselectAllProducts: () => void;
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
  // TODO: productId === item.product.id이 맞는지 확인해볼 것.(item.id)
  removeProduct: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
  toggleProduct: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId
          ? { ...item, selected: !item.selected }
          : item
      ),
    })),
  increaseProductQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: (item.quantity ?? 0) + 1 }
          : item
      ),
    })),
  decreaseProductQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: (item.quantity ?? 1) - 1 }
          : item
      ),
    })),
  selectAllProducts: () =>
    set((state) => ({
      cart: state.cart.map((item) => ({ ...item, selected: true })),
    })),
  unselectAllProducts: () =>
    set((state) => ({
      cart: state.cart.map((item) => ({ ...item, selected: false })),
    })),
}));

export default createSelectors(useCartStoreBase);
