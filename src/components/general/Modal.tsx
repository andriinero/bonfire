import { ReactNode, useEffect } from 'react';

import cn from '@/utils/cn';

import { AnimatePresence, motion } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  onModalClick: () => void;
  className?: string;
  children?: ReactNode;
};

const Modal = ({ isOpen, onModalClick, className, children }: ModalProps) => {
  useEffect(() => {
    const onEscapeDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onModalClick();
    };
    window.addEventListener('keydown', onEscapeDown);

    return () => {
      window.removeEventListener('keydown', onEscapeDown);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          exit={{ opacity: 0 }}
          className={cn(
            'fixed inset-0 z-10 flex h-dvh w-dvw flex-col items-center justify-center',
            className,
          )}
        >
          <div
            aria-label="Modal Backdrop"
            onClick={onModalClick}
            className={cn(
              'absolute -z-10 h-full w-full bg-gray-900 bg-opacity-20',
              className,
            )}
          ></div>
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="dialog-label"
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
