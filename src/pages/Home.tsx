import { useGetChatRoomsQuery } from '@/features/chatRooms/chatRoomsSlice';

import ChatContainer from '@/features/chat/components/ChatContainer';
import Sidebar from '@/layout/Sidebar';
import { useGetAuthDataQuery } from '@/features/auth/authSlice';

const Home = () => {
  useGetAuthDataQuery();
  useGetChatRoomsQuery();

  return (
    <div className="grid max-h-dvh grid-cols-[minmax(auto,28rem),1fr] grid-rows-[minmax(5rem,auto),1fr]">
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

export default Home;
