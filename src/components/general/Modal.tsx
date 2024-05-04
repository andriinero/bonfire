import { ReactNode } from 'react';

import cn from '@/utils/cn';

type ModalProps = {
  isOpen: boolean;
  onModalClick?: () => void;
  className?: string;
  children?: ReactNode;
};

const Modal = ({ isOpen, onModalClick, className, children }: ModalProps) => {
  return (
    <div
      onClick={onModalClick}
      className={cn(
        'invisible fixed z-0 flex h-dvh w-dvw flex-col items-center justify-center bg-gray-900 bg-opacity-35',
        className,
        { visible: isOpen },
      )}
    >
      {children}
    </div>
  );
};

export default Modal;
