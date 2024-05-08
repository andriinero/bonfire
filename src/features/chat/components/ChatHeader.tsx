import { useAppSelector } from '@/app/hooks';

import getNonAuthUserIds from '@/utils/getNonAuthUserIds';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { selectChatRoomById } from '@/features/chatRooms/chatRoomsSlice';
import {
  selectParticipantById,
  selectParticipantsByChatId,
} from '@/features/participants/participantsSlice';
import { selectSelectedChatId } from '../chatSlice';

import ChatTitle from '@/components/general/ChatTitle';
import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import { FaEllipsis } from 'react-icons/fa6';

const ChatHeader = () => {
  const authUserId = useAppSelector(selectAuthUserId) as string;
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;

  const chat = useAppSelector(selectChatRoomById(selectedChatId));
  const participants = useAppSelector(
    selectParticipantsByChatId(selectedChatId),
  );
  const nonAuthParticipants = getNonAuthUserIds(authUserId, participants);
  const firstUser = useAppSelector(
    selectParticipantById(selectedChatId, nonAuthParticipants[0]),
  );

  return (
    <header className="flex items-center justify-between border-b p-4 shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)]">
      <div className="flex items-center gap-2">
        <UserIcon
          isOnline={firstUser?.is_online}
          src={firstUser?.profile_image}
        />
        <div>
          {chat && <ChatTitle chatId={chat?._id} />}
          <p className="text-sm text-gray-500">
            {firstUser?.is_online ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      <IconButton aria-label="chat-options" className="text-sky-500">
        <FaEllipsis />
      </IconButton>
    </header>
  );
};

export default ChatHeader;
