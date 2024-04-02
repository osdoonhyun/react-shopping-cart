import { useState } from 'react';
import { useGetCartProductsQuery } from '@/hooks/queries/useGetCartProductsQuery';
import CartTable from '@components/Cart/CartTable';
import CartHeader from '@components/Cart/CartHeader';
import CartPayments from '@components/Cart/CartPayments';
import { CartProduct } from '@/types/cart';

export default function Cart() {
  const { cartProducts } = useGetCartProductsQuery();
  const [selectedProducts, setSelectedProducts] = useState<CartProduct[]>([]);

  return (
    <section className='cart-section'>
      <CartHeader />

      <div className='flex'>
        <section className='cart-left-section'>
          <CartTable
            cartProducts={cartProducts}
            selectProduct={setSelectedProducts}
          />
        </section>

        <section className='cart-right-section'>
          <CartPayments />
        </section>
      </div>
    </section>
  );
}
