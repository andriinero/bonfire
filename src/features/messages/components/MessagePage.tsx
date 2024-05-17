import { useAppSelector } from '@/app/hooks';

import { selectMessagesByChatId } from '../messagesSlice';

import MessageItem from './MessageItem';

type MessagePageProps = { chatRoomId: string; page: number };

const MessagePage = ({ chatRoomId, page }: MessagePageProps) => {
  const messagesList = useAppSelector(selectMessagesByChatId(chatRoomId, page));

  return (
    <>
      {messagesList &&
        messagesList.map((m) => (
          <MessageItem
            key={m._id}
            chatRoomId={chatRoomId}
            page={page}
            id={m._id}
          />
        ))}
    </>
  );
};

export default MessagePage;
