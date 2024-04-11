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
    <div className='flex justify-between items-center'>
      {hasProducts && (
        <>
          <div className='checkbox-container'>
            <input
              className='checkbox'
              name='checkbox'
              type='checkbox'
              checked={isSelectedAll()}
              onChange={onSelectAllChange}
            />
            <label className='checkbox-label' htmlFor='checkbox'>
              {isSelectedAll() ? '선택해제' : '전체선택'}
            </label>
          </div>

          <button className='delete-button' onClick={onRemoveSelectedProducts}>
            상품삭제
          </button>
        </>
      )}
    </div>
  );
}
