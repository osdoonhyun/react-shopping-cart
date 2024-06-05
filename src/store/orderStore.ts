import { create } from 'zustand';
import createSelectors from '@/store/selectors';
import { persist } from 'zustand/middleware';
import { Order } from '@/types/order';

interface OrderState {
  order: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderId: Order['id']) => Order | undefined;
  clearOrder: () => void;
}

const useOrderStoreBase = create<OrderState>()(
  persist(
    (set, get) => ({
      order: [],

      addOrder: (order) => {
        set((state) => ({
          order: [...state.order, order],
        }));
      },

      getOrderById: (orderId) =>
        get().order.find((order) => order.id === orderId),

      clearOrder: () => set({ order: [] }),
    }),
    { name: 'order-storage' }
  )
);

const useOrderStore = createSelectors(useOrderStoreBase);

export default useOrderStore;
