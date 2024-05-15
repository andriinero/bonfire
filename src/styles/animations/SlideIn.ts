import type { AnimationProps } from 'framer-motion';

export const SlideIn: AnimationProps = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 100 },
  transition: { duration: 0.25 },
};
