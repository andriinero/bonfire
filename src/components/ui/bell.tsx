import { motion, useAnimation } from 'motion/react';
import { useEffect } from 'react';

import type { Variants } from 'motion/react';

const svgVariants: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -10, 10, -10, 0] },
};

type BellIconProps = { isActive: boolean };

const BellIcon = ({ isActive }: BellIconProps) => {
  const controls = useAnimation();

  useEffect(() => {
    let intervalId = null;
    if (isActive) {
      intervalId = setInterval(() => {
        controls.start('animate');
      }, 2000);
    }

    return () => {
      if (intervalId) clearTimeout(intervalId);
    };
  }, [controls, isActive]);

  return (
    <div className="hover:bg-accent flex cursor-pointer select-none items-center justify-center rounded-md transition-colors duration-200">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={svgVariants}
        animate={controls}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </motion.svg>
    </div>
  );
};

export { BellIcon };
