import { useGetMessagesQuery } from '../messagesSlice';

import Spinner from '@/components/general/Spinner';
import MessageItem from './MessageItem';

type MessagePageProps = { chatRoomId: string; page: number };

const MessagePage = ({ chatRoomId, page }: MessagePageProps) => {
  const { data: messagesList, isFetching } = useGetMessagesQuery({
    chatRoomId,
    page,
  });

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        messagesList &&
        messagesList.map((m) => (
          <MessageItem
            key={m._id}
            chatRoomId={chatRoomId}
            page={page}
            id={m._id}
          />
        ))
      )}
    </>
  );
};

export default MessagePage;
