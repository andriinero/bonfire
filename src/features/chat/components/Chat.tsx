import { useAppSelector } from '@/app/hooks';
import useInitChat from '@/hooks/useInitChat';

import { selectIsChatDrawerOpen, selectIsSidebarOpen } from '../chatSlice';

import ChatHeader from './ChatHeader';
import ChatLoader from './ChatLoader';
import ChatMain from './ChatMain';
import cn from '@/utils/cn';
import ChatDrawer from './ChatDrawer';
import { AnimatePresence } from 'framer-motion';

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
          <AnimatePresence>
            {isChatDrawerOpen && <ChatDrawer />}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Chat;
