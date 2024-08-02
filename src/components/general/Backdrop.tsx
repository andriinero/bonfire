import { motion } from 'framer-motion';

import cn from '@/utils/cn';

import { FadeIn } from '@/styles/animations/FadeIn';
import type { ComponentPropsWithoutRef, MouseEventHandler } from 'react';

type BackdropProps = {
  onBackdropClick: MouseEventHandler;
} & ComponentPropsWithoutRef<'div'>;

const Backdrop = ({ onBackdropClick, className }: BackdropProps) => {
  return (
    <motion.div
      initial={FadeIn.initial}
      animate={FadeIn.animate}
      transition={FadeIn.transition}
      exit={FadeIn.exit}
      aria-label="Backdrop"
      onClick={onBackdropClick}
      className={cn(
        'fixed inset-0 z-10 h-full w-full cursor-pointer bg-gray-900 bg-opacity-20',
        className,
      )}
    ></motion.div>
  );
};

export default Backdrop;
