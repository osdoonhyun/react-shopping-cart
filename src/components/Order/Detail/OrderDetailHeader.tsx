import { useNavigate } from '@tanstack/react-router';
import { Order } from '@/types/order';

interface OrderDetailHeaderProps extends Pick<Order, 'id'> {
  detailButton?: boolean;
}

export default function OrderDetailHeader({
  id,
  detailButton = false,
}: OrderDetailHeaderProps) {
  const navigate = useNavigate();

  const handleDetailsButtonClick = (orderId: string) => {
    navigate({
      to: '/orderList/$orderId',
      params: { orderId },
    });
  };

  return (
    <div className='order-list__header'>
      <span>주문번호: {id}</span>
      {detailButton && (
        <button onClick={() => handleDetailsButtonClick(String(id))}>
          <span>{`상세보기 >`}</span>
        </button>
      )}
    </div>
  );
}
