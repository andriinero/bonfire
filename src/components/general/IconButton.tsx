import { HtmlHTMLAttributes, ReactNode } from 'react';

import cn from '@/utils/cn';

type ControlsIconProps = {
  isSelected?: boolean;
  className?: string;
  children?: ReactNode;
} & HtmlHTMLAttributes<HTMLDivElement>;

const IconButton = ({
  isSelected = false,
  className,
  children,
  ...otherProps
}: ControlsIconProps) => {
  return (
    <div
      className={cn(
        'cursor-pointer rounded-lg p-3 text-neutral-500 transition hover:bg-neutral-100',
        className,
        {
          'bg-neutral-100 text-black': isSelected,
        },
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default IconButton;
