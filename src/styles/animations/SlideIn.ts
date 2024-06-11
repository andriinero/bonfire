import type { AnimationProps } from 'framer-motion';

export const NotificationSlideIn: AnimationProps = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 100 },
  transition: { duration: 0.25 },
};

export const DrawerSlideIn: AnimationProps = {
  initial: { x: 460 },
  animate: { x: 0 },
  exit: { x: 460 },
  transition: { duration: 0.25 },
};
