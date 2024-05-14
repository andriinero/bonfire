import { useAppSelector } from '@/app/hooks';
import useNonAuthParticipants from '@/features/chatRooms/hooks/useNonAuthParticipants';

import { selectChatRoomById } from '@/features/chatRooms/chatRoomsSlice';
import { selectSelectedChatId } from '../chatSlice';

import ChatTitle from '@/components/general/ChatTitle';
import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import { FaEllipsis } from 'react-icons/fa6';
import ChatOnlineStatus from './ChatOnlineStatus';

const ChatHeader = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;
  const selectedChat = useAppSelector(selectChatRoomById(selectedChatId));
  const nonAuthParticipants = useNonAuthParticipants(selectedChatId);
  const firstParticipant = nonAuthParticipants?.[0];

  return (
    <header className="flex items-center justify-between border-b p-4 shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)]">
      <div className="flex items-center gap-2">
        <UserIcon
          isOnline={firstParticipant?.is_online}
          src={firstParticipant?.profile_image}
        />
        <div>
          {selectedChat && <ChatTitle chatId={selectedChat?._id} />}
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
