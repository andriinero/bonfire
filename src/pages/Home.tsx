import { useAppSelector } from '@/app/hooks';

import { selectSelectedChatId } from '@/features/chat/chatSlice';

import Sidebar from '@/layout/Sidebar';
import ChatHeader from '@/features/chat/components/ChatHeader';
import ChatMain from '@/features/chat/components/ChatMain';

const Home = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId);

  return (
    <div className="grid min-h-dvh grid-cols-[minmax(auto,27rem),1fr] grid-rows-[auto,1fr]">
      <Sidebar />
      {selectedChatId ? (
        <>
          <ChatHeader selectedChatId={selectedChatId} />
          <ChatMain />
        </>
      ) : (
        <div className="row-span-2 flex items-center justify-center bg-gray-50">
          No chat selected!
        </div>
      )}
    </div>
  );
};

export default Home;
