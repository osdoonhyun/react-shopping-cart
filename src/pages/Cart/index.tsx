import { useCallback, useState } from 'react';
import CartTable from '@components/Cart/CartTable';
import CartHeader from '@components/Cart/CartHeader';
import CartPayments from '@components/Cart/CartPayments';
import { CartProduct } from '@/types/cart';

export default function Cart() {
  const [selectedProducts, setSelectedProducts] = useState<CartProduct[]>([]);

  const totalQuantity = useCallback(() => {
    return selectedProducts.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0);
  }, [selectedProducts]);

  const totalAmount = useCallback(() => {
    return selectedProducts.reduce(
      (acc, cur) => acc + (cur.quantity ?? 0) * cur.product.price,
      0
    );
  }, [selectedProducts]);

  return (
    <section className='cart-section'>
      <CartHeader />

      <div className='flex'>
        <section className='cart-left-section'>
          <CartTable
            selectedProducts={selectedProducts}
            selectProduct={setSelectedProducts}
          />
        </section>

        <section className='cart-right-section'>
          <CartPayments
            totalAmount={totalAmount}
            totalQuantity={totalQuantity}
            selectedProducts={selectedProducts}
          />
        </section>
      </div>
    </section>
  );
}
