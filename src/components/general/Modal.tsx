import { motion } from 'framer-motion';
import { useEffect } from 'react';

import cn from '@/utils/cn';

import { FadeIn, FadeInWithScale } from '@/styles/animations/FadeIn';
import type { ReactNode } from 'react';

import { AnimatePresence } from 'framer-motion';

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
          className="fixed inset-0 z-10 flex h-dvh w-dvw flex-col items-center justify-center"
        >
          <div
            aria-label="Modal Backdrop"
            onClick={onModalClick}
            className="absolute -z-10 h-full w-full bg-gray-900 bg-opacity-20"
          ></div>
          <motion.div
            initial={FadeInWithScale.initial}
            animate={FadeInWithScale.animate}
            transition={FadeInWithScale.transition}
            exit={FadeInWithScale.exit}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="dialog-label"
            className={cn('w-full max-w-sm', className)}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
