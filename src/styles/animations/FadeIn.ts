import type { AnimationProps } from 'framer-motion';

const TRANSITION_DURATION = 0.1;

export const FadeIn: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: TRANSITION_DURATION },
  exit: { opacity: 0 },
};

export const FadeInWithScale: AnimationProps = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: TRANSITION_DURATION },
  exit: { opacity: 0, scale: 0.95 },
};
