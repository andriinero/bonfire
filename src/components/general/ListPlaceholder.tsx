import { ReactNode } from 'react';

import cn from '@/utils/cn';

type ListPlaceholderProps = { className?: string; children?: ReactNode };

const ListPlaceholder = ({ className, children }: ListPlaceholderProps) => {
  return (
    <p className={cn('mt-8 text-center italic text-gray-600', className)}>
      {children}
    </p>
  );
};

export default ListPlaceholder;
