import { OrderDetail } from '@/types/order';
import { Fragment } from 'react/jsx-dev-runtime';

interface OrderResultItemProps {
  orderDetail: OrderDetail;
}

export default function OrderResultItem({
  orderDetail: { name, imageUrl, quantity },
}: OrderResultItemProps) {
  return (
    <Fragment>
      <div className='order-container'>
        <div className='flex gap-15 mt-10'>
          <img className='w-144 h-144' src={imageUrl} alt={name} />
          <div className='flex-col gap-15'>
            <span className='order-name'>{name}</span>
            <span>{`수량: ${quantity}`}</span>
          </div>
        </div>
      </div>
      <hr className='divide-line-thin mt-10' />
    </Fragment>
  );
}
