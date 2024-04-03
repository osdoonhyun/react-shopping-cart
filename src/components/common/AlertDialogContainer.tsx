import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import useAlertDialogStore from '@/store/alertDialogStore';

const ALERT_DIALOG_ID = 'alert-dialog';

export default function AlertDialogContainer() {
  const isOpen = useAlertDialogStore.use.isOpen();
  const title = useAlertDialogStore.use.title();
  const message = useAlertDialogStore.use.message();
  const btnText = useAlertDialogStore.use.btnText();
  const onConfirm = useAlertDialogStore.use.onConfirm();
  const onClose = useAlertDialogStore.use.onClose();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return createPortal(
    <>
      <div className='alert-dialog-container' onClick={onClose}></div>
      <div className='alert-dialog-content'>
        <h2 className='alert-dialog-title'>{title}</h2>
        <p className='alert-dialog-message'>{message}</p>
        <div className='alert-dialog-button-container'>
          <button
            className='alert-dialog-confirm-button'
            onClick={handleConfirm}
          >
            {btnText}
          </button>
          <button className='alert-dialog-cancel-button' onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </>,
    document.getElementById(ALERT_DIALOG_ID) as HTMLDivElement
  );
}
