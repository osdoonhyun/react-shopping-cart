import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface CartToolBarProps {
  hasProducts: boolean;
  isSelectedAll: () => boolean;
  onSelectAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveSelectedProducts: () => void;
}

export default function CartToolBar({
  hasProducts,
  isSelectedAll,
  onSelectAllChange,
  onRemoveSelectedProducts,
}: CartToolBarProps) {
  return (
    <section
      className={flex({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      })}
    >
      {hasProducts && (
        <>
          <div
            className={flex({
              justifyContent: 'space-between',
              width: '278px',
              flexGrow: 1,
            })}
          >
            <label
              className={css({
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: 'white',
              })}
            >
              <input
                className={css({
                  appearance: 'none',
                  width: '18px',
                  height: '18px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease-in-out',

                  '&:checked': {
                    borderColor: 'blue.500',
                    backgroundColor: 'blue.500',
                  },

                  '& + span': {
                    marginLeft: '8px',
                  },

                  '&:checked::after': {
                    content: '""',
                    display: 'block',
                    width: '5px',
                    height: '10px',
                    border: 'solid white',
                    borderWidth: '0 2px 2px 0',
                    transform: 'rotate(45deg)',
                    marginLeft: '6px',
                    marginTop: '2px',
                  },
                })}
                type='checkbox'
                checked={isSelectedAll()}
                onChange={onSelectAllChange}
              />
              <span
                className={css({
                  fontSize: '14px',
                  lineHeight: '1',
                  userSelect: 'none',
                })}
              >
                {isSelectedAll() ? '선택해제' : '전체선택'}
              </span>
            </label>

            <button
              className={css({
                display: 'inline',
                width: 'max-content',
                padding: '0 0 0 0',
                borderBottom: '1px solid #bbb',
                color: 'gray800',
                fontSize: '14px',
              })}
              onClick={onRemoveSelectedProducts}
            >
              상품삭제
            </button>
          </div>
        </>
      )}
    </section>
  );
}
