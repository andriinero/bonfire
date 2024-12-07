import type { ReactNode } from 'react';

import cn from '@/utils/cn';

type ListPlaceholderProps = { className?: string; children?: ReactNode };

const ListPlaceholder = ({ className, children }: ListPlaceholderProps) => {
  return (
    <div
      className={cn(
        'flex h-full items-center justify-center pt-4 text-gray-600',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ListPlaceholder;
