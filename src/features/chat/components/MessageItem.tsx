import { useAppSelector } from '@/app/hooks';

import { selectMessageById } from '@/features/messages/messagesSlice';

import UserMessage from './UserMessage';
import ActionMessage from './ActionMessage';
import { MessageData } from '@/types/MessageData';

type MessageItemProps = { messageId: string };

const MessageItem = ({ messageId }: MessageItemProps) => {
  const message = useAppSelector(selectMessageById(messageId)) as MessageData;

  return message.type === 'message' ? (
    <UserMessage {...message} />
  ) : (
    <ActionMessage {...message} />
  );
};

export default MessageItem;
