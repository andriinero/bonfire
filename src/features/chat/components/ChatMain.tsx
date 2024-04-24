import ChatMessageInput from './ChatMessageInput';
import MessageList from '../../messages/components/MessageList';

const ChatMain = () => {
  return (
    <main className="row-span-2 flex h-full flex-col">
      <MessageList />
      <ChatMessageInput />
    </main>
  );
};

export default ChatMain;
