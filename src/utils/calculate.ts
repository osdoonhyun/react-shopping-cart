import { CartProduct } from '@/types/cart';

export const calculateTotalQuantity = (cart: CartProduct[]) => {
  return cart.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0);
};

export const calculateTotalAmount = (cart: CartProduct[]) => {
  return cart.reduce(
    (acc, cur) => acc + (cur.quantity ?? 0) * cur.product.price,
    0
  );
};
