import useInitChat from '@/hooks/useInitChat';
import ChatHeader from './ChatHeader';
import ChatMain from './ChatMain';
import Spinner from '@/components/general/Spinner';
import ChatPlaceholder from './ChatPlaceholder';

type ChatProps = { selectedChatId: string };

const Chat = ({ selectedChatId }: ChatProps) => {
  const { isLoading } = useInitChat(selectedChatId);

  return isLoading ? (
    <ChatPlaceholder />
  ) : (
    <>
      <ChatHeader />
      <ChatMain />
    </>
  );
};

export default Chat;
