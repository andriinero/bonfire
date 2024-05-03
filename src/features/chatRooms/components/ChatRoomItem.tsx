import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useNonAuthUserIds from '../../../hooks/useNonAuthUserParticipants';
import useChatLastMessage from '@/features/messages/hooks/useChatLastMessage';
import useInitChat from '@/hooks/useInitChat';

import cn from '@/utils/cn';

import { selectChatRoomById } from '../chatRoomsSlice';
import {
  selectSelectedChatId,
  selectedChatIdSet,
} from '@/features/chat/chatSlice';
import {
  selectParticipantById,
  selectParticipantsByChatId,
} from '@/features/participants/participantsSlice';

import UserIcon from '@/components/general/UserIcon';
import TimeStamp from '@/components/general/TimeStamp';
import MessagePreview from './MessagePreview';
import ChatTitle from '@/components/general/ChatTitle';

type ChatRoomItemProps = {
  chatId: string;
};

const ChatRoomItem = ({ chatId }: ChatRoomItemProps) => {
  useInitChat(chatId);

  const selectedChatId = useAppSelector(selectSelectedChatId);
  const chatRoom = useAppSelector(selectChatRoomById(chatId));
  const participants = useAppSelector(selectParticipantsByChatId(chatId));
  const nonAuthParticipants = useNonAuthUserIds(participants);
  const firstParticipant = useAppSelector(
    selectParticipantById(chatId, nonAuthParticipants[0]),
  );
  const lastMessage = useChatLastMessage(chatId);

  const dispatch = useAppDispatch();

  const handleChatClick = (): void => {
    dispatch(selectedChatIdSet(chatId));
  };

  const isChatRoomSelected = selectedChatId === chatId;

  return (
    <li
      className={cn('flex cursor-pointer gap-4 rounded-lg p-2 transition', {
        'hover:bg-gray-50': !isChatRoomSelected,
        'bg-gray-100': isChatRoomSelected,
      })}
      onClick={handleChatClick}
    >
      <div>
        <UserIcon
          key={firstParticipant?._id}
          isOnline={firstParticipant?.is_online}
          src={firstParticipant?.profile_image}
          style="lg"
        />
      </div>
      <div className="flex grow justify-between gap-2">
        <div className="flex flex-col justify-between">
          {chatRoom?.name && <ChatTitle title={chatRoom.name} />}
          {lastMessage && <MessagePreview {...lastMessage} />}
        </div>
        <div>{lastMessage && <TimeStamp date={lastMessage.created} />}</div>
      </div>
    </li>
  );
};

export default ChatRoomItem;
