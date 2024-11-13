import { useGetMessagesQuery } from '../messagesSlice';

import MessageItem from './MessageItem';

type MessagePageProps = { chatRoomId: string; page: number };

const MessagePage = ({ chatRoomId, page }: MessagePageProps) => {
  const { data: messagesList } = useGetMessagesQuery({
    chatRoomId,
    page,
  });

  return (
    <>
      {messagesList &&
        messagesList.map((m) => (
          <MessageItem
            key={m.id}
            chatRoomId={chatRoomId}
            page={page}
            id={m.id}
          />
        ))}
    </>
  );
};

export default MessagePage;
