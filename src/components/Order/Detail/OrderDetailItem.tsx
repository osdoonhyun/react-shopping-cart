import { useNavigate } from '@tanstack/react-router';
import { OrderDetail } from '@/types/order';
import { formatToKRW } from '@/utils/formatter';

interface OrderDetailItemProps {
  orderList: OrderDetail[];
}

export default function OrderDetailItem({ orderList }: OrderDetailItemProps) {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate({ to: '/cart' });
  };

  return (
    <>
      {orderList.map(({ id, name, price, imageUrl, quantity }: OrderDetail) => (
        <div key={id} className='order-list-item'>
          <div className='flex gap-15 mt-10'>
            <img className='w-144 h-144' src={imageUrl} alt={name} />
            <div className='flex-col gap-15'>
              <span className='order-name'>{name}</span>
              <span className='order-info'>
                {`${formatToKRW(price)} / 수량: ${quantity}개`}
              </span>
            </div>
          </div>
          <button
            onClick={handleCartClick}
            className='primary-button-small flex-center self-start'
          >
            장바구니
          </button>
        </div>
      ))}
    </>
  );
}
