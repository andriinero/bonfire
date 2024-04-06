import cn from '@/utils/cn';
import { ReactNode } from 'react';

type ValidationErrorProps = {
  visible?: boolean;
  className?: string;
  children?: ReactNode;
};

const ValidationError = ({
  visible = true,
  className,
  children,
}: ValidationErrorProps) => {
  return (
    <p
      className={cn(
        'invisible -translate-y-0.5 text-xs text-red-500 opacity-0 transition',
        className,
        {
          'visible -translate-y-0 opacity-100': visible,
        },
      )}
    >
      * {children}
    </p>
  );
};

export default ValidationError;
