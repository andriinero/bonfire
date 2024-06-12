import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useChatLastMessage from '@/features/messages/hooks/useChatLastMessage';
import useInitAndUpdateChatLoadingState from '../hooks/useInitAndUpdateChatLoadingState';

import cn from '@/utils/cn';

import {
  selectSelectedChatId,
  selectedChatIdSet,
  sidebarClosed,
} from '@/features/chat/chatSlice';
import { drawerClosed } from '@/features/drawer/drawerSlice';
import { selectIsChatRoomsLoading } from '../chatRoomsSlice';

import ChatTitle from '@/components/general/ChatTitle';
import DotDivider from '@/components/general/DotDivider';
import TimeStamp from '@/components/general/TimeStamp';
import ChatRoomItemLoader from '@/components/loaders/ChatRoomItemLoader';
import ChatRoomIcon from './ChatRoomIcon';
import MessagePreview from './MessagePreview';

type ChatRoomItemProps = {
  chatId: string;
};

const ChatRoomItem = ({ chatId }: ChatRoomItemProps) => {
  useInitAndUpdateChatLoadingState(chatId);

  const isChatRoomsLoading = useAppSelector(selectIsChatRoomsLoading);
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;
  const lastMessage = useChatLastMessage(chatId);

  const dispatch = useAppDispatch();

  const handleChatClick = (): void => {
    dispatch(selectedChatIdSet(chatId));
    dispatch(sidebarClosed());
    dispatch(drawerClosed());
  };

  const isChatRoomSelected = selectedChatId === chatId;

  return (
    <li
      className={cn(
        'flex min-h-16 cursor-pointer gap-4 rounded-lg p-2 transition',
        {
          'hover:bg-gray-50': !isChatRoomSelected,
          'sm:bg-gray-100': isChatRoomSelected,
        },
      )}
      onClick={handleChatClick}
    >
      {isChatRoomsLoading ? (
        <ChatRoomItemLoader />
      ) : (
        <>
          <div className="my-auto shrink-0">
            <ChatRoomIcon chatRoomId={chatId} />
          </div>
          <div className="flex grow justify-between gap-2">
            <div className="flex flex-col justify-between">
              <ChatTitle chatRoomId={chatId} />
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
                  <p>Start chatting!</p>
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
