import { ReactNode } from 'react';
import { useAppSelector } from '@/app/hooks';

import cn from '@/utils/cn';

import { selectMessageById } from '@/features/messages/messagesSlice';

type MessageProps = {
  messageId: string;
  type?: string;
  className?: string;
};

const MessageItem = ({
  messageId,
  type = 'message',
  className,
}: MessageProps) => {
  const messageData = useAppSelector(selectMessageById(messageId));

  return (
    <p className={cn('', className, { '': type === 'action' })}>
      {messageData?.body}
    </p>
  );
};

export default MessageItem;
