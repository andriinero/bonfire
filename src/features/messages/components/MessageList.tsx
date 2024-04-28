import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectSelectedChatId } from '../../chat/chatSlice';
import {
  selectShouldScrollDown,
  shouldScrollDownSet,
  useGetMessagesQuery,
} from '@/features/messages/messagesSlice';

import Spinner from '@/components/general/Spinner';
import MessageItem from './MessageItem';
import ErrorMessage from '@/components/general/ErrorMessage';

const MessageList = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const shouldScrollDown = useAppSelector(selectShouldScrollDown);
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;
  const {
    data: messagesList,
    isFetching,
    isSuccess,
  } = useGetMessagesQuery(selectedChatId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shouldScrollDown && listRef.current) {
      handleScrollToBottom();
      dispatch(shouldScrollDownSet(false));
    }
  }, [shouldScrollDown]);

  const handleScrollToBottom = (): void => {
    if (listRef.current) {
      const ul = listRef.current;
      const scrollHeight = listRef.current.scrollHeight;
      ul.scrollTo(0, scrollHeight);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {isFetching ? (
        <Spinner />
      ) : isSuccess ? (
        <ul
          ref={listRef}
          className="flex h-full flex-col-reverse gap-6 overflow-y-auto p-4"
        >
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
        <ErrorMessage>Error: failed to fetch messages.</ErrorMessage>
      )}
    </div>
  );
};

export default MessageList;
