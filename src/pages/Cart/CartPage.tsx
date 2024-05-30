import { useState } from 'react';
import { flex } from '@/styled-system/patterns';
import { css } from '@/styled-system/css';
import CartTable from '@components/Cart/CartTable';
import CartHeader from '@components/Cart/CartHeader';
import CartPayments from '@components/Cart/CartPayments';
import { CartProduct } from '@/types/cart';

export default function CartPage() {
  const [selectedProducts, setSelectedProducts] = useState<CartProduct[]>([]);

  return (
    <section
      className={flex({
        flexDirection: 'column',
        paddingBottom: '60px',
        gap: '20px',
      })}
    >
      <CartHeader />

      <div
        className={flex({
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '50px',
        })}
      >
        <section
          className={flex({
            flexDirection: 'column',
            flexGrow: 1,
          })}
        >
          <CartTable
            selectedProducts={selectedProducts}
            selectProduct={setSelectedProducts}
          />
        </section>

        <section
          className={css({
            position: {
              base: 'fixed',
              lg: 'static',
            },
            bottom: {
              base: '0',
              lg: 'auto',
            },
            left: {
              base: '0',
              lg: 'auto',
            },
            width: {
              base: '100%',
              lg: '280px',
            },
            minWidth: '375px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '10px',
            border: '1px solid #d1d1d1',
            borderRadius: '4px',
            backgroundColor: 'white',
          })}
        >
          <CartPayments selectedProducts={selectedProducts} />
        </section>
      </div>
    </section>
  );
}
