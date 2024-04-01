import CartHeader from '@components/Cart/CartHeader';
import CartPayments from '@components/Cart/CartPayments';
import CartProducts from '@components/Cart/CartProducts';
import CartProductsHeader from '@components/Cart/CartProductsHeader';
import CartToolBar from '@components/Cart/CartToolBar';
import { useGetCartProductsQuery } from '@/hooks/queries/useGetCartProductsQuery';

export default function Cart() {
  const { cartProducts } = useGetCartProductsQuery();

  return (
    <section className='cart-section'>
      <CartHeader />

      <div className='flex'>
        <section className='cart-left-section'>
          <CartToolBar />
          <CartProductsHeader />
          <CartProducts cartProducts={cartProducts} />
        </section>

        <section className='cart-right-section'>
          <CartPayments />
        </section>
      </div>
    </section>
  );
}
