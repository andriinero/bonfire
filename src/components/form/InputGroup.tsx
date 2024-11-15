import cn from '@/utils/cn';

import type { ReactNode } from 'react';

type InputGroupProps = { children?: ReactNode; className?: string };

const InputGroup = ({ children, className }: InputGroupProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {children}
    </div>
  );
};

export default InputGroup;
