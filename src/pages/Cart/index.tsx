import CartHeader from '@components/@common/Cart/CartHeader';
import CartPayments from '@components/@common/Cart/CartPayments';
import CartProducts from '@components/@common/Cart/CartProducts';
import CartProductsHeader from '@components/@common/Cart/CartProductsHeader';
import CartToolBar from '@components/@common/Cart/CartToolBar';
import { useGetCartProductsQuery } from '@components/hooks/queries/useGetCartProductsQuery';

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
