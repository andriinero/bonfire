import cn from '@/utils/cn';

import type { ReactNode } from 'react';

type InputGroupProps = { children?: ReactNode; className?: string };

const InputGroup = ({ children, className }: InputGroupProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      {children}
    </div>
  );
};

export default InputGroup;
