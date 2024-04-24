import { useAppSelector } from '@/app/hooks';

import { selectSelectedChatId } from '../chatSlice';

import ChatMain from './ChatMain';
import ChatHeader from './ChatHeader';
import ChatPlaceholder from './ChatPlaceholder';

const ChatContainer = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId);

  return selectedChatId ? (
    <>
      <ChatHeader />
      <ChatMain />
    </>
  ) : (
    <ChatPlaceholder />
  );
};

export default ChatContainer;
