import { useAppSelector } from '@/app/hooks';

import { selectSelectedChatId } from '../chatSlice';

import ChatTitle from '@/components/general/ChatTitle';
import IconButton from '@/components/general/IconButton';
import ChatRoomIcon from '@/features/chatRooms/components/ChatRoomIcon';
import { FaChevronLeft, FaEllipsis } from 'react-icons/fa6';
import ChatOnlineStatus from './ChatOnlineStatus';

const ChatHeader = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;

  return (
    <header className="flex items-center justify-between gap-16 border-b p-4 shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)]">
      <div className="flex items-center gap-2">
        <IconButton
          aria-label="chat-options"
          className="p-0 text-amber-500 sm:hidden"
        >
          <FaChevronLeft />
        </IconButton>
        <ChatRoomIcon className="shrink-0" chatRoomId={selectedChatId} />
        <div>
          <ChatTitle chatId={selectedChatId} />
          <p className="text-sm text-gray-500">
            <ChatOnlineStatus id={selectedChatId} />
          </p>
        </div>
      </div>
      <IconButton aria-label="chat-options" className="text-amber-500">
        <FaEllipsis />
      </IconButton>
    </header>
  );
};

export default ChatHeader;
