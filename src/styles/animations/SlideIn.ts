import type { Variants } from 'framer-motion';

export const NotificationSlideIn: Variants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 100, transition: { duration: 0.2 } },
};

export const DrawerSlideIn: Variants = {
  initial: { x: 450 },
  animate: { x: 0, transition: { duration: 0.25 } },
  exit: { x: 450, transition: { duration: 0.25 } },
};
