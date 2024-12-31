import cn from '@/utils/cn';

import {
  forwardRef,
  type ComponentProps,
  type MouseEventHandler,
  type ReactNode,
} from 'react';

type ControlsIconProps = {
  onClick?: MouseEventHandler;
  isSelected?: boolean;
  style?: 'primary' | 'round';
  className?: string;
  children?: ReactNode;
} & ComponentProps<'button'>;

const IconButton = forwardRef<HTMLButtonElement, ControlsIconProps>(
  (
    {
      onClick,
      isSelected = false,
      style = 'primary',
      className,
      children,
      ...otherProps
    },
    ref,
  ) => {
    return (
      <button
        onClick={onClick}
        type="button"
        className={cn(
          'rounded-lg p-3 text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500',
          {
            'bg-gray-100 text-gray-800': isSelected,
          },
          {
            'rounded-full bg-gray-100 p-2 text-gray-800 hover:bg-gray-200':
              style === 'round',
          },
          className,
        )}
        {...otherProps}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export default IconButton;
