import type { Variants } from 'framer-motion';

export const NotificationSlideIn: Variants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 100, transition: { duration: 0.2 } },
};

export const DrawerSlideIn: Variants = {
  initial: { x: 350 },
  animate: { x: 0, transition: { duration: 0.35, type: 'spring', bounce: 0 } },
  exit: { x: 350, transition: { duration: 0.35, type: 'spring', bounce: 0 } },
};
