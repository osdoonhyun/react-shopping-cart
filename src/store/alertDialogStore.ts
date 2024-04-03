import { create } from 'zustand';
import createSelectors from '@/store/selectors';

interface AlertDialogOption {
  title: string;
  message: string;
  btnText: string;
  onConfirm: () => void;
}

interface AlertDialogState extends AlertDialogOption {
  isOpen: boolean;
  onOpen: (options: AlertDialogOption) => void;
  onClose: () => void;
}

const useAlertDialogStoreBase = create<AlertDialogState>()((set) => ({
  isOpen: false,
  title: '',
  message: '',
  btnText: '',
  onConfirm: () => {},
  onOpen: (options) => set({ isOpen: true, ...options }),
  onClose: () => set({ isOpen: false }),
}));

export default createSelectors(useAlertDialogStoreBase);
