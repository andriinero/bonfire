import { ReactNode } from 'react';

import cn from '@/utils/cn';

type ErrorProps = { className?: string };

const ErrorMessage = ({ className }: ErrorProps) => {
  return <div className={cn('', className)}>Error: failed to fetch.</div>;
};

export default ErrorMessage;
