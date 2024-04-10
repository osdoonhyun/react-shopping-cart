import { useState } from 'react';
import CartTable from '@components/Cart/CartTable';
import CartHeader from '@components/Cart/CartHeader';
import CartPayments from '@components/Cart/CartPayments';
import { CartProduct } from '@/types/cart';

export default function CartPage() {
  const [selectedProducts, setSelectedProducts] = useState<CartProduct[]>([]);

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
          <CartPayments selectedProducts={selectedProducts} />
        </section>
      </div>
    </section>
  );
}
