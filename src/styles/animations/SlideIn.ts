import type { AnimationProps } from 'framer-motion';

export const NotificationSlideIn: AnimationProps = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 100 },
  transition: { duration: 0.2 },
};

export const DrawerSlideIn: AnimationProps = {
  initial: { x: 350 },
  animate: { x: 0 },
  exit: { x: 350 },
  transition: { duration: 0.35, type: 'spring', bounce: 0 },
};
