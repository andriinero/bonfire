import cn from '@/utils/cn';

import { ReactNode } from 'react';

type InputGroupProps = { children?: ReactNode; className?: string };

const InputGroup = ({ children, className }: InputGroupProps) => {
  return <div className={cn('flex flex-col gap-1', className)}>{children}</div>;
};

export default InputGroup;
