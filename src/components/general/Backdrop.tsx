import { motion } from 'framer-motion';

import cn from '@/utils/cn';

import type { ComponentPropsWithoutRef, MouseEventHandler } from 'react';
import { FadeIn } from '@/styles/animations/FadeIn';

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
        'absolute -z-10 h-full w-full bg-gray-900 bg-opacity-20',
        className,
      )}
    ></motion.div>
  );
};

export default Backdrop;
