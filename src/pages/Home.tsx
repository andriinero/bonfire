import Chat from '@/features/chat/components/Chat';
import Sidebar from '@/layout/Sidebar';

const Home = () => {
  return (
    <div className="fixed grid max-h-full w-dvw grid-cols-[minmax(auto,28rem),1fr] grid-rows-[auto,minmax(0,1fr)]">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
