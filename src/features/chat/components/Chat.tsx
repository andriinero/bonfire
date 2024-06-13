import { useAppSelector } from '@/app/hooks';
import useInitChat from '@/hooks/useInitChat';

import cn from '@/utils/cn';

import { selectIsSidebarOpen } from '../chatSlice';

import ChatHeader from './ChatHeader';
import ChatLoader from './ChatLoader';
import ChatMain from './ChatMain';

type ChatProps = { selectedChatId: string };

const Chat = ({ selectedChatId }: ChatProps) => {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
  const { isLoading } = useInitChat(selectedChatId);

  return (
    <div
      className={cn('flex h-dvh flex-1 flex-col sm:flex', {
        hidden: isSidebarOpen,
      })}
    >
      {isLoading ? (
        <ChatLoader />
      ) : (
        <>
          <ChatHeader />
          <ChatMain />
        </>
      )}
    </div>
  );
};

export default Chat;
