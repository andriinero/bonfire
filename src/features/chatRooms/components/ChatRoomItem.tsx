import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useChatLastMessage from '@/features/messages/hooks/useChatLastMessage';
import useInitChat from '@/hooks/useInitChat';
import { useEffect } from 'react';

import cn from '@/utils/cn';
import getNonAuthUserIds from '@/utils/getNonAuthUserIds';

import { selectAuthUserId } from '@/features/auth/authSlice';
import {
  selectSelectedChatId,
  selectedChatIdSet,
} from '@/features/chat/chatSlice';
import {
  selectParticipantById,
  selectParticipantsByChatId,
} from '@/features/participants/participantsSlice';

import ChatTitle from '@/components/general/ChatTitle';
import DotDivider from '@/components/general/DotDivider';
import TimeStamp from '@/components/general/TimeStamp';
import UserIcon from '@/components/general/UserIcon';
import ChatRoomItemLoader from '@/components/loaders/ChatRoomItemLoader';
import {
  chatRoomLoadingFinished,
  chatRoomLoadingStarted,
  selectIsChatRoomsLoading,
} from '../chatRoomsSlice';
import MessagePreview from './MessagePreview';

type ChatRoomItemProps = {
  chatId: string;
};

const ChatRoomItem = ({ chatId }: ChatRoomItemProps) => {
  const { isError, isSuccess, isLoading } = useInitChat(chatId);
  const isChatRoomsLoading = useAppSelector(selectIsChatRoomsLoading);
  const authUserId = useAppSelector(selectAuthUserId) as string;
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;
  const participants = useAppSelector(selectParticipantsByChatId(chatId));
  const nonAuthParticipants = getNonAuthUserIds(authUserId, participants);
  const firstParticipant = useAppSelector(
    selectParticipantById(chatId, nonAuthParticipants[0]),
  );
  const lastMessage = useChatLastMessage(chatId);

  const dispatch = useAppDispatch();

  const handleChatClick = (): void => {
    dispatch(selectedChatIdSet(chatId));
  };

  useEffect(() => {
    if (isSuccess || isError) dispatch(chatRoomLoadingFinished(chatId));
    if (isLoading) dispatch(chatRoomLoadingStarted(chatId));
  }, [isSuccess, isError, isLoading, chatId, dispatch]);

  const isChatRoomSelected = selectedChatId === chatId;

  return (
    <li
      className={cn(
        'flex min-h-16 cursor-pointer gap-4 rounded-lg p-2 transition',
        {
          'hover:bg-gray-50': !isChatRoomSelected,
          'bg-gray-100': isChatRoomSelected,
        },
      )}
      onClick={handleChatClick}
    >
      {isChatRoomsLoading ? (
        <ChatRoomItemLoader />
      ) : (
        <>
          <div className="shrink-0">
            <UserIcon
              key={firstParticipant?._id}
              isOnline={firstParticipant?.is_online}
              src={firstParticipant?.profile_image}
              style="lg"
            />
          </div>
          <div className="flex grow justify-between gap-2">
            <div className="flex flex-col justify-between">
              <ChatTitle chatId={chatId} />
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {lastMessage ? (
                  <>
                    <MessagePreview className="line-clamp-1" {...lastMessage} />
                    <DotDivider className="text-gray-500" />
                    <TimeStamp
                      className="whitespace-nowrap"
                      date={lastMessage.created}
                    />
                  </>
                ) : (
                  <p>chat is empty</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default ChatRoomItem;
