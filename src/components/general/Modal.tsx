import { useEffect } from 'react';

import type { ReactNode } from 'react';

import cn from '@/utils/cn';

import { AnimatePresence, motion } from 'framer-motion';
import { FadeIn } from '@/styles/animations/FadeIn';

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
  }, [onModalClick]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={FadeIn.initial}
          animate={FadeIn.animate}
          transition={FadeIn.transition}
          exit={FadeIn.exit}
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
