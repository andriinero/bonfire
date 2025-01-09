import { motion } from 'framer-motion';

import cn from '@/utils/cn';

import { FadeInWithScale } from '@/styles/animations/FadeIn';
import type { ReactNode } from 'react';

import { AnimatePresence } from 'framer-motion';
import Backdrop from './Backdrop';
import useEscapeListener from '@/hooks/useEscapeListener';

type ModalProps = {
  isOpen: boolean;
  onBackdropClick: () => void;
  className?: string;
  children?: ReactNode;
};

const Modal = ({
  isOpen,
  onBackdropClick,
  className,
  children,
}: ModalProps) => {
  useEscapeListener(onBackdropClick);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex h-dvh w-dvw flex-col items-center justify-center">
          <Backdrop onBackdropClick={onBackdropClick} />
          <motion.div
            variants={FadeInWithScale}
            initial="initial"
            animate="animate"
            exit="exit"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="dialog-label"
            className={cn('z-10 w-full max-w-sm', className)}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
