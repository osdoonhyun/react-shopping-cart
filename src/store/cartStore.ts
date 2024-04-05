import { create } from 'zustand';
import createSelectors from '@/store/selectors';
import { CartProduct } from '@/types/cart';
import { Product } from '@/types/product';

interface CartState {
  cart: CartProduct[];

  addToCart: (product: CartProduct) => void;
  clearCart: () => void;
  removeProducts: (productIds: Set<Product['id']>) => void;
  removeProduct: (productId: CartProduct['id']) => void;
  increaseProductQuantity: (productId: CartProduct['id']) => void;
  decreaseProductQuantity: (productId: CartProduct['id']) => void;
}

const useCartStoreBase = create<CartState>()((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const isProductExist = state.cart.some(
        (item) => item.product.id === product.product.id
      );

      if (isProductExist) {
        return { cart: [...state.cart] };
      } else {
        const newProduct = { ...product, quantity: 1 };

        return { cart: [...state.cart, newProduct] };
      }
    }),
  clearCart: () => set({ cart: [] }),
  removeProducts: (productIds) =>
    set((state) => ({
      cart: state.cart.filter((item) => !productIds.has(item.product.id)),
    })),
  removeProduct: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
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
}));

export default createSelectors(useCartStoreBase);
