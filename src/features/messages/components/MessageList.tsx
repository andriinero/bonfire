import { useAppSelector } from '@/app/hooks';

import { selectSelectedChatId } from '../../chat/chatSlice';
import { useGetMessagesQuery } from '@/features/messages/messagesSlice';

import Spinner from '@/components/general/Spinner';
import MessageItem from './MessageItem';
import ErrorMessage from '@/components/general/ErrorMessage';

const MessageList = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;
  const {
    data: messagesList,
    isFetching,
    isSuccess,
  } = useGetMessagesQuery(selectedChatId);

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      {isFetching ? (
        <Spinner />
      ) : isSuccess ? (
        <ul>
          {messagesList ? (
            messagesList!.map((m) => (
              <MessageItem
                key={m._id}
                chatRoomId={selectedChatId}
                messageId={m._id}
              />
            ))
          ) : (
            <p>No messages</p>
          )}
        </ul>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
};

export default MessageList;
