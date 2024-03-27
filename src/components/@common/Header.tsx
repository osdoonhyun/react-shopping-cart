import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header>
      <nav className='nav flex justify-around'>
        <div className='flex-center'>
          <Link to='/' className='font-bold'>
            <h1 className='nav-title'>🛒 NEXTSTEP</h1>
          </Link>
        </div>
        <div className='flex gap-15'>
          <button className='nav-button'>
            <Link to='/cart' className='[&.active]:font-bold nav-button'>
              장바구니
            </Link>
          </button>
          <button className='nav-button'>
            <Link to='/order' className='[&.active]:font-bold nav-button'>
              주문목록
            </Link>
          </button>
        </div>
      </nav>
    </header>
  );
}
