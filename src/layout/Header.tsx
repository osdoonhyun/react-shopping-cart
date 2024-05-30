import { Link } from '@tanstack/react-router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import useCartStore from '@/store/cartStore';

export default function Header() {
  const cart = useCartStore.use.cart();

  return (
    <header
      className={css({
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minWidth: '375px',
        height: '80px',
        backgroundColor: 'blue.300',
      })}
    >
      <nav
        className={css({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1280px',
          width: '100%',
          padding: '0 20px',
        })}
      >
        {/* LOGO */}
        <div
          className={css({
            alignItems: 'center',
            gap: '8px',
          })}
        >
          <button
            className={css({
              paddingX: '12px',
            })}
          >
            <Link to='/list'>
              <h1
                className={css({
                  color: 'white',
                  fontSize: '40px',
                  fontWeight: 'bold',
                })}
              >
                🛒 NEXTSTEP
              </h1>
            </Link>
          </button>
        </div>

        {/* LINKS */}
        <div
          className={flex({
            gap: {
              base: '10px',
              sm: '18px',
            },
          })}
        >
          <Link to='/cart'>
            <span className={headerLink}>
              {`장바구니${cart.length > 0 ? ` (${cart.length})` : ''}`}
            </span>
          </Link>

          <Link to='/orderList'>
            <span className={headerLink}>주문목록</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

const headerLink = css({
  color: 'white',
  fontWeight: 'semibold',
  fontSize: {
    base: '18px',
    sm: '22px',
  },
});
