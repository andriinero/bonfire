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
    <div className="flex-1 overflow-y-auto">
      {isFetching ? (
        <Spinner />
      ) : isSuccess ? (
        <ul className="flex h-full flex-col gap-6 overflow-y-auto p-4">
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
