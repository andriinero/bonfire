import cn from '@/utils/cn';

import type { ComponentProps } from 'react';

type ValidationErrorProps = {
  visible?: boolean;
} & ComponentProps<'span'>;

const ValidationError = ({
  visible = true,
  className,
  children,
}: ValidationErrorProps) => {
  return (
    <span
      className={cn(
        'invisible -translate-y-0.5 text-xs text-red-500 opacity-0 transition',
        className,
        {
          'visible -translate-y-0 opacity-100': visible,
        },
      )}
    >
      * {children}
    </span>
  );
};

export default ValidationError;
