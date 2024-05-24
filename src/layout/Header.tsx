import { Link } from '@tanstack/react-router';
import useCartStore from '@/store/cartStore';

export default function Header() {
  const cart = useCartStore.use.cart();

  return (
    <header>
      <nav className='nav flex justify-around'>
        <div className='flex-center'>
          <button className='nav-button'>
            <Link to='/list' className='font-bold'>
              <h1 className='nav-title'>🛒 NEXTSTEP</h1>
            </Link>
          </button>
        </div>
        <div className='flex gap-15'>
          <button className='nav-button'>
            <Link to='/cart' className='[&.active]:font-bold nav-button'>
              {`장바구니${cart.length > 0 ? ` (${cart.length})` : ''}`}
            </Link>
          </button>
          <button className='nav-button'>
            <Link to='/orderList' className='[&.active]:font-bold nav-button'>
              주문목록
            </Link>
          </button>
        </div>
      </nav>
    </header>
  );
}
