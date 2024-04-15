import { useAppSelector } from '@/app/hooks';

import { selectSelectedChatId } from '@/features/chat/chatSlice';

import ChatHeader from '@/features/chat/components/ChatHeader';
import ChatMain from '@/features/chat/components/ChatMain';
import Sidebar from '@/layout/Sidebar';

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
        <h1>No chat selected!</h1>
      )}
    </div>
  );
};

export default Home;
