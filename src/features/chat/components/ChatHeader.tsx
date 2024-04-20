import useNonAuthUserParticipants from '@/features/chats/hooks/useNonAuthUserParticipants';

import { selectChatById, useGetChatsQuery } from '@/features/chats/chatsSlice';

import { FaEllipsis } from 'react-icons/fa6';
import ChatTitle from '@/components/general/ChatTitle';
import UserIcon from '@/components/general/UserIcon';
import IconButton from '@/components/general/IconButton';
import Spinner from '@/components/general/Spinner';
import { useAppSelector } from '@/app/hooks';
import { selectSelectedChatId } from '../chatSlice';

const ChatHeader = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId);
  const { isLoading, isFetching } = useGetChatsQuery();

  const chat = useAppSelector(selectChatById(selectedChatId!));

  const nonAuthUser = useNonAuthUserParticipants(chat?.participants);
  const participant = nonAuthUser[0];

  return isLoading || isFetching ? (
    <Spinner />
  ) : (
    <header className="flex items-center justify-between border-b p-4 shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)]">
      <div className="flex items-center gap-2">
        <UserIcon
          isOnline={participant?.is_online}
          src={chat?.participants[0].profile_image}
        />
        <div>
          <ChatTitle participants={chat?.participants!} />
          <p className="text-sm text-gray-500">
            {participant?.is_online ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      <IconButton className="text-sky-500">
        <FaEllipsis />
      </IconButton>
    </header>
  );
};

export default ChatHeader;
