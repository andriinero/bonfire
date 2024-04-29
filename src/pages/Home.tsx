import { useAppSelector } from '@/app/hooks';

import { selectSelectedChatId } from '@/features/chat/chatSlice';

import Sidebar from '@/layout/Sidebar';
import Chat from '@/features/chat/components/Chat';

const Home = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId);

  return (
    <div className="grid max-h-dvh grid-cols-[minmax(auto,28rem),1fr] grid-rows-[minmax(5rem,auto),1fr]">
      <Sidebar />
      {selectedChatId && <Chat selectedChatId={selectedChatId} />}
    </div>
  );
};

export default Home;
