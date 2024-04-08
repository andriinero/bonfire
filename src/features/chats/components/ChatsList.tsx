import { ReactNode } from 'react';

import cn from '@/utils/cn';

type ChatsListProps = { className?: string; children?: ReactNode };

const ChatsList = ({ className, children }: ChatsListProps) => {
  return <div className={cn('', className)}>{children}</div>;
};

export default ChatsList;
