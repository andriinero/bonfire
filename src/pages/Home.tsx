import useInitHome from '@/hooks/useInitHome';

import Sidebar from '@/layout/Sidebar';
import Spinner from '@/components/general/Spinner';
import ChatMain from '@/features/chat/components/ChatMain';
import ChatHeader from '@/features/chat/components/ChatHeader';
import ChatPlaceholder from '@/features/chat/components/ChatPlaceholder';

const Home = () => {
  const { isLoading } = useInitHome();

  return (
    <div className="grid max-h-dvh grid-cols-[minmax(auto,28rem),1fr] grid-rows-[minmax(5rem,auto),1fr]">
      <Sidebar />
      {isLoading ? (
        <ChatPlaceholder>
          <Spinner />
        </ChatPlaceholder>
      ) : (
        <>
          <ChatHeader />
          <ChatMain />
        </>
      )}
    </div>
  );
};

export default Home;
