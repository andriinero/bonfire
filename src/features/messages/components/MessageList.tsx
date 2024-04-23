import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
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
  const ulRef = useRef<HTMLUListElement>(null);
  const shouldScrollDown = useAppSelector(selectShouldScrollDown);
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;
  const {
    data: messagesList,
    isFetching,
    isSuccess,
  } = useGetMessagesQuery(selectedChatId);

  const dispatch = useAppDispatch();

  const handleScrollToBottom = (): void => {
    if (ulRef.current) {
      const ul = ulRef.current;
      const scrollHeight = ulRef.current.scrollHeight;
      ul.scrollTo(0, scrollHeight);
    }
  };

  useEffect(() => {
    if (shouldScrollDown && ulRef.current) {
      handleScrollToBottom();
      dispatch(shouldScrollDownSet(false));
    }
  }, [isSuccess, shouldScrollDown]);

  return (
    <div className="flex-1 overflow-y-auto">
      {isFetching ? (
        <Spinner />
      ) : isSuccess ? (
        <ul
          ref={ulRef}
          className="flex h-full flex-col gap-6 overflow-y-auto p-4"
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
        <ErrorMessage />
      )}
    </div>
  );
};

export default MessageList;
