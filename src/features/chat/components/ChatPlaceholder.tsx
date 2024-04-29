import { ReactNode } from 'react';

import cn from '@/utils/cn';

type ChatPlaceholderProps = { className?: string; children?: ReactNode };

const ChatPlaceholder = ({ className, children }: ChatPlaceholderProps) => {
  return (
    <div className={cn('row-start-1 row-end-3', className)}>{children}</div>
  );
};

export default ChatPlaceholder;
