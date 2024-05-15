import type { AnimationProps } from 'framer-motion';

export const FadeIn: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.15 },
  exit: { opacity: 0 },
};
