import { EventHandler, MouseEvent, MouseEventHandler, ReactNode } from 'react';

import cn from '@/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  onModalClick: () => void;
  className?: string;
  children?: ReactNode;
};

const Modal = ({ isOpen, onModalClick, className, children }: ModalProps) => {
  const handleModalClick = (e: MouseEvent) => {
    e.stopPropagation();
    onModalClick();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          className={cn(
            'fixed inset-0 z-10 flex h-dvh w-dvw flex-col items-center justify-center',
            className,
          )}
        >
          <div
            onClick={handleModalClick}
            className={cn(
              'absolute -z-10 h-full w-full bg-gray-900 bg-opacity-35',
              className,
            )}
          ></div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
