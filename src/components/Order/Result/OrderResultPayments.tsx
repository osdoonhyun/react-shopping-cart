import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { formatToKRW } from '@/utils/formatter';
import Divider from '@components/common/Divider/Divider';
import Title from '@components/common/Title/Title';

interface OrderResultPaymentsProps {
  totalAmount: number;
  onPaymentButtonClick: () => void;
}

export default function OrderResultPayments({
  totalAmount,
  onPaymentButtonClick,
}: OrderResultPaymentsProps) {
  return (
    <>
      <div
        className={flex({
          flexDirection: 'column',
          padding: '20px',
          gap: '20px',
        })}
      >
        <div
          className={flex({
            display: {
              base: 'none',
              lg: 'block',
            },
            flexDirection: 'column',
          })}
        >
          <Title as='h3' variant='subtitle'>
            결제금액
          </Title>
          <Divider color='gray' />
        </div>

        <div
          className={flex({
            flexDirection: 'row',
            justifyContent: 'space-between',
          })}
        >
          <span className='highlight-text'>총 결제금액</span>
          <span className='highlight-text'>{formatToKRW(totalAmount)}</span>
        </div>
      </div>

      <button
        className={css({
          width: '100%',
          height: 'auto',
          textAlign: 'center',
          padding: '10px 16px',
          fontSize: 'subtitle',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          backgroundColor: 'blue.400',
          color: 'white',
          _disabled: {
            opacity: 0.6,
            cursor: 'not-allowed',
          },
        })}
        onClick={onPaymentButtonClick}
        disabled={totalAmount === 0}
      >
        {`${formatToKRW(totalAmount)} 결제하기`}
      </button>
    </>
  );
}
