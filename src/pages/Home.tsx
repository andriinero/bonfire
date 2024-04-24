import Chat from '@/features/chat/components/Chat';
import Sidebar from '@/layout/Sidebar';

const Home = () => {
  return (
    <div className="grid max-h-dvh grid-cols-[minmax(auto,28rem),1fr] grid-rows-[minmax(5rem,auto),1fr]">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
