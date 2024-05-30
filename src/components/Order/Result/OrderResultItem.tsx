import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { OrderDetail } from '@/types/order';
import { formatToKRW } from '@/utils/formatter';

interface OrderResultItemProps {
  orderDetail: OrderDetail;
}

export default function OrderResultItem({
  orderDetail: { name, imageUrl, quantity, price },
}: OrderResultItemProps) {
  return (
    <li className={flex({ gap: '10px' })}>
      <div
        className={flex({
          justifyContent: 'row',
          alignItems: 'center',
          gap: '10px',
        })}
      >
        <img
          className={css({
            width: {
              base: '80px',
              sm: '120px',
            },
            height: {
              base: '80px',
              sm: '120px',
            },
            flex: '1 0 120px !important',
            objectFit: 'cover',
            borderRadius: '4px',
            border: 'none',
          })}
          src={imageUrl}
          alt={name}
        />
      </div>
      <div
        className={flex({
          position: 'relative',
          flex: '1 0 0',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: {
            base: '4px',
            sm: '10px',
          },
        })}
      >
        <span
          className={css({
            fontSize: {
              base: '14px',
              sm: '18px',
            },
            paddingRight: '12px',
          })}
        >
          {name}
        </span>
        <div
          className={flex({
            flexDirection: 'column',
            justifyContent: 'space-between',
          })}
        >
          <div
            className={flex({
              flexDirection: 'row',
              justifyContent: 'flex-end',
            })}
          >
            <span
              className={css({
                fontSize: {
                  base: '14px',
                  sm: '18px',
                },
              })}
            >{`수량: ${quantity}`}</span>
          </div>
          <span
            className={css({
              fontSize: {
                base: '14px',
                sm: '18px',
              },
            })}
          >
            {formatToKRW(price * quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}
