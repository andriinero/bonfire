import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useNonAuthUserIds from '../../../hooks/useNonAuthUserParticipants';
import useChatLastMessage from '@/features/messages/hooks/useChatLastMessage';

import { selectChatRoomById } from '../chatRoomsSlice';
import { selectedChatIdSet } from '@/features/chat/chatSlice';
import { messagesApiSlice } from '@/features/messages/messagesSlice';
import {
  participantsApiSlice,
  selectParticipantsById,
} from '@/features/participants/participantsSlice';

import UserIcon from '@/components/general/UserIcon';
import TimeStamp from '@/components/general/TimeStamp';
import MessagePreview from './MessagePreview';
import ChatTitle from '@/components/general/ChatTitle';

type ChatRoomItemProps = {
  chatId: string;
};

const ChatRoomItem = ({ chatId }: ChatRoomItemProps) => {
  const chatById = useAppSelector(selectChatRoomById(chatId));
  const nonAuthUsers = useNonAuthUserIds(chatById?.participants);
  const user = useAppSelector(selectParticipantsById(chatId, nonAuthUsers[0]));
  const lastMessage = useChatLastMessage(chatId);

  useEffect(() => {
    dispatch(messagesApiSlice.endpoints.getMessages.initiate(chatId));
    dispatch(participantsApiSlice.endpoints.getParticipants.initiate(chatId));
  }, []);

  const dispatch = useAppDispatch();

  const handleChatClick = (): void => {
    dispatch(selectedChatIdSet(chatId));
  };

  return (
    <li
      className="flex cursor-pointer gap-4 rounded-lg bg-gray-100 p-2"
      onClick={handleChatClick}
    >
      <div>
        {user && (
          <UserIcon
            key={user._id}
            isOnline={user.is_online}
            src={user.profile_image}
            style="lg"
          />
        )}
      </div>
      <div className="flex grow justify-between gap-2">
        <div className="flex flex-col justify-between">
          {chatById && <ChatTitle title={chatById.name} />}
          {lastMessage && <MessagePreview {...lastMessage} />}
        </div>
        <div>{lastMessage && <TimeStamp date={lastMessage.created} />}</div>
      </div>
    </li>
  );
};

export default ChatRoomItem;
