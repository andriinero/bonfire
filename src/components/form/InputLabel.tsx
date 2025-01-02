import type { ComponentProps, ReactNode } from 'react';

import cn from '@/utils/cn';

type InputLabelProps = {
  className?: string;
  children?: ReactNode;
} & ComponentProps<'label'>;

const InputLabel = ({
  className,
  children,
  ...otherProps
}: InputLabelProps) => {
  return (
    <label
      {...otherProps}
      className={cn(
        'cursor-pointer text-sm font-medium text-gray-950',
        className,
      )}
    >
      {children}
    </label>
  );
};

export default InputLabel;
