import useInitChat from '@/hooks/useInitChat';

import ChatHeader from './ChatHeader';
import ChatMain from './ChatMain';
import ChatLoader from './ChatLoader';

type ChatProps = { selectedChatId: string };

const Chat = ({ selectedChatId }: ChatProps) => {
  const { isLoading } = useInitChat(selectedChatId);

  return isLoading ? (
    <ChatLoader />
  ) : (
    <>
      <ChatHeader />
      <ChatMain />
    </>
  );
};

export default Chat;
