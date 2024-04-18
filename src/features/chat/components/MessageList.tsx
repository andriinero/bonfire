import { useAppSelector } from '@/app/hooks';

import { selectSelectedChatId } from '../chatSlice';
import { useGetMessagesQuery } from '@/features/messages/messagesSlice';

import MessageItem from './MessageItem';
import Spinner from '@/components/general/Spinner';
import ErrorMessage from '@/components/general/ErrorMessage';

const MessageList = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;
  const {
    data: messagesList,
    isFetching,
    isSuccess,
  } = useGetMessagesQuery(selectedChatId);

  return isFetching ? (
    <Spinner />
  ) : isSuccess ? (
    <div className="flex flex-1 flex-col gap-6 p-4">
      <ul>
        {messagesList!.map((m) => (
          <MessageItem key={m._id} messageId={m._id} />
        ))}
      </ul>
      <p>No messages</p>
    </div>
  ) : (
    <ErrorMessage />
  );
};

export default MessageList;
