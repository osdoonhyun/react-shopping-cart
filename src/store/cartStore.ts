import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import createSelectors from '@/store/selectors';
import { CartProduct } from '@/types/cart';

interface CartState {
  cart: CartProduct[];

  // actions: {
  addToCart: (product: CartProduct) => void;
  clearCart: () => void;
  removeProducts: (productIds: CartProduct['id'][]) => void;
  removeProduct: (productId: CartProduct['id']) => void;
  increaseQuantity: (productId: CartProduct['id']) => void;
  decreaseQuantity: (productId: CartProduct['id']) => void;
  // };
}

const useCartStoreBase = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // actions: {
      addToCart: (product) =>
        set((state) => {
          const isProductExist = get().cart.some(
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
          cart: state.cart.filter(
            (item) => !productIds.includes(item.product.id)
          ),
        })),
      removeProduct: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: (item.quantity ?? 0) + 1 }
              : item
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: (item.quantity ?? 1) - 1 }
              : item
          ),
        })),
      // },
    }),
    { name: 'cart-storage', partialize: (state) => ({ cart: state.cart }) }
  )
);

const useCartStore = createSelectors(useCartStoreBase);

export default useCartStore;
