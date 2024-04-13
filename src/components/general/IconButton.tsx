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
        'rounded-lg p-3 text-gray-500 transition hover:bg-gray-100',
        className,
        {
          'bg-gray-100 text-gray-800': isSelected,
        },
        {
          'rounded-full bg-gray-100 p-2 text-gray-800 hover:bg-gray-200':
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
