import cn from '@/utils/cn';
import { ReactNode } from 'react';

type ErrorProps = { className?: string; children?: ReactNode };

const ErrorMessage = ({ className, children }: ErrorProps) => {
  return (
    <p className={cn('', className)}>
      {children ? children : 'Error: failed to fetch.'}
    </p>
  );
};

export default ErrorMessage;
