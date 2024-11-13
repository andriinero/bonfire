import { useAppSelector } from '@/app/hooks';

import { selectMessageById } from '../messagesSlice';

import ActionMessage from '@/features/messages/components/ActionMessage';
import UserMessage from '@/features/messages/components/UserMessage';

type MessageProps = {
  chatRoomId: string;
  page: number;
  id: string;
  className?: string;
};

const MessageItem = ({ chatRoomId, page, id }: MessageProps) => {
  const message = useAppSelector(selectMessageById({ chatRoomId, page, id }));

  return message ? (
    message?.type === 'MESSAGE' ? (
      <UserMessage {...message} />
    ) : (
      <ActionMessage body={message.body} />
    )
  ) : (
    <p>Message couldn't be loaded</p>
  );
};

export default MessageItem;
