import { useAppSelector } from '@/app/hooks';

import { selectMessageById } from '../messagesSlice';

import ActionMessage from '@/features/messages/components/ActionMessage';
import UserMessage from '@/features/messages/components/UserMessage';

type MessageProps = {
  chatRoomId: string;
  messageId: string;
  className?: string;
};

const MessageItem = ({ chatRoomId, messageId }: MessageProps) => {
  const message = useAppSelector(selectMessageById(chatRoomId, messageId, 0));

  return message ? (
    message?.type === 'message' ? (
      <UserMessage {...message} />
    ) : (
      <ActionMessage body={message.body} />
    )
  ) : (
    <p>Message couldn't be loaded</p>
  );
};

export default MessageItem;
