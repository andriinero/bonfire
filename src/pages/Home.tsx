import { useAppDispatch } from '@/app/hooks';
import { setSelectedChatId } from '@/features/chat/chatSlice';
import ChatHeader from '@/features/chat/components/ChatHeader';
import ChatMain from '@/features/chat/components/ChatMain';
import Sidebar from '@/layout/Sidebar';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedChatId('johnchat01'));
  }, [dispatch]);

  return (
    <div className="grid min-h-dvh grid-cols-[minmax(auto,27rem),1fr] grid-rows-[auto,1fr]">
      <Sidebar />
      <ChatHeader />
      <ChatMain />
    </div>
  );
};

export default Home;
