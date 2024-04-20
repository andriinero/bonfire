import MessageInput from './MessageInput';
import MessageList from '../../messages/components/MessageList';

const ChatMain = () => {
  return (
    <main className="h-full flex flex-col row-span-3">
      <MessageList />
      <MessageInput />
    </main>
  );
};

export default ChatMain;
