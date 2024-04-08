import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import cn from '@/utils/cn';

type ControlsIconProps = {
  isSelected?: boolean;
  style?: 'primary' | 'round';
  className?: string;
  children?: ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

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
        'rounded-lg p-3 text-neutral-500 transition hover:bg-neutral-100',
        className,
        {
          'bg-neutral-100 text-neutral-800': isSelected,
        },
        {
          'rounded-full bg-neutral-100 p-2 text-neutral-800 hover:bg-neutral-200':
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
