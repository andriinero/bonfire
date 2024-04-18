import { useAppSelector } from '@/app/hooks';

import cn from '@/utils/cn';

import { selectMessagesById } from '../messagesSlice';

type MessageProps = {
  chatRoomId: string;
  messageId: string;
  className?: string;
};

const MessageItem = ({ chatRoomId, messageId, className }: MessageProps) => {
  const message = useAppSelector(selectMessagesById(chatRoomId, messageId));

  return (
    <p className={cn('', className, { '': message?.type === 'action' })}>
      {message?.body}
    </p>
  );
};

export default MessageItem;
