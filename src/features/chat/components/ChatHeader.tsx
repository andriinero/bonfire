import { useAppSelector } from '@/app/hooks';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { selectChatRoomById } from '@/features/chatRooms/chatRoomsSlice';
import { selectParticipantsByChatId } from '@/features/participants/participantsSlice';
import { selectSelectedChatId } from '../chatSlice';

import ChatTitle from '@/components/general/ChatTitle';
import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import { FaEllipsis } from 'react-icons/fa6';
import ChatOnlineStatus from './ChatOnlineStatus';

const ChatHeader = () => {
  const authUserId = useAppSelector(selectAuthUserId) as string;
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;

  const currentChat = useAppSelector(selectChatRoomById(selectedChatId));
  const nonAuthParticipants = useAppSelector(
    selectParticipantsByChatId(selectedChatId),
  )!.filter((p) => p._id !== authUserId)!;

  const firstParticipant = nonAuthParticipants[0];

  return (
    <header className="flex items-center justify-between border-b p-4 shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)]">
      <div className="flex items-center gap-2">
        <UserIcon
          isOnline={firstParticipant?.is_online}
          src={firstParticipant?.profile_image}
        />
        <div>
          {currentChat && <ChatTitle chatId={currentChat?._id} />}
          <p className="text-sm text-gray-500">
            <ChatOnlineStatus id={selectedChatId} />
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
