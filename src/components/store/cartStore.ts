import create from 'zustand';
import createSelectors from '@/components/store/selectors';
import { CartProduct } from '@components/types/product';

interface cartState {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void; // 상품 추가
}

const useCartStoreBase = create<cartState>()((set) => ({
  cart: [],

  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
}));

export default createSelectors(useCartStoreBase);
