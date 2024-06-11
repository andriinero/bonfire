import useInitChat from '@/hooks/useInitChat';

import ChatHeader from './ChatHeader';
import ChatMain from './ChatMain';
import ChatLoader from './ChatLoader';

type ChatProps = { selectedChatId: string };

const Chat = ({ selectedChatId }: ChatProps) => {
  const { isLoading } = useInitChat(selectedChatId);

  return (
    <div className="flex h-dvh flex-1 flex-col">
      {isLoading ? (
        <ChatLoader />
      ) : (
        <>
          <ChatHeader />
          <ChatMain />
        </>
      )}
    </div>
  );
};

export default Chat;
