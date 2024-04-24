import { useAppSelector } from '@/app/hooks';

import { selectMessageById } from '../messagesSlice';

import UserMessage from '@/features/messages/components/UserMessage';
import ActionMessage from '@/features/messages/components/ActionMessage';

type MessageProps = {
  chatRoomId: string;
  messageId: string;
  className?: string;
};

const MessageItem = ({ chatRoomId, messageId }: MessageProps) => {
  const message = useAppSelector(selectMessageById(chatRoomId, messageId));

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
