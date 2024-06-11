import { useAppSelector } from '@/app/hooks';
import useInitChat from '@/hooks/useInitChat';

import { selectIsChatDrawerOpen, selectIsSidebarOpen } from '../chatSlice';

import ChatHeader from './ChatHeader';
import ChatLoader from './ChatLoader';
import ChatMain from './ChatMain';
import cn from '@/utils/cn';
import ChatDrawer from './ChatDrawer';

type ChatProps = { selectedChatId: string };

const Chat = ({ selectedChatId }: ChatProps) => {
  const isChatDrawerOpen = useAppSelector(selectIsChatDrawerOpen);
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
          {isChatDrawerOpen && <ChatDrawer />}
        </>
      )}
    </div>
  );
};

export default Chat;
