import { ReactNode } from 'react';

import cn from '@/utils/cn';

type ControlsIconProps = {
  isSelected?: boolean;
  style?: 'primary' | 'round';
  className?: string;
  children?: ReactNode;
};

const IconButton = ({
  isSelected = false,
  style = 'primary',
  className,
  children,
  ...otherProps
}: ControlsIconProps) => {
  return (
    <button
      className={cn(
        'rounded-md p-3 text-neutral-500 transition hover:bg-neutral-100',
        className,
        {
          'bg-neutral-100 text-black': isSelected,
          'rounded-full bg-neutral-100 p-2 text-black hover:bg-neutral-200':
            style === 'round',
        },
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default IconButton;
