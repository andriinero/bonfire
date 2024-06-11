import MessageList from '../../messages/components/MessageList';
import ChatMessageInput from './ChatMessageInput';

const ChatMain = () => {
  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <MessageList />
      <ChatMessageInput />
    </main>
  );
};

export default ChatMain;
