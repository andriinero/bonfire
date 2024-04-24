import { useAppSelector } from '@/app/hooks';
import useNonAuthUserIds from '@/hooks/useNonAuthUserParticipants';

import { selectSelectedChatId } from '../chatSlice';
import { selectParticipantsById } from '@/features/participants/participantsSlice';
import { selectChatById } from '@/features/chats/chatsSlice';

import { FaEllipsis } from 'react-icons/fa6';
import UserIcon from '@/components/general/UserIcon';
import IconButton from '@/components/general/IconButton';
import ChatTitle from '@/components/general/ChatTitle';

const ChatHeader = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;

  const chat = useAppSelector(selectChatById(selectedChatId));
  const firstUser = useAppSelector(
    selectParticipantsById(selectedChatId, chat?.participants[0] as string),
  );

  return (
    <header className="flex items-center justify-between border-b p-4 shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)]">
      {firstUser && (
        <>
          <div className="flex items-center gap-2">
            <UserIcon
              isOnline={firstUser?.is_online}
              src={firstUser?.profile_image}
            />
            <div>
              {chat && <ChatTitle title={chat.name} />}
              <p className="text-sm text-gray-500">
                {firstUser.is_online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <IconButton className="text-sky-500">
            <FaEllipsis />
          </IconButton>
        </>
      )}
    </header>
  );
};

export default ChatHeader;
