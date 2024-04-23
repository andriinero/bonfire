import MessageInput from './MessageInput';
import MessageList from '../../messages/components/MessageList';

const ChatMain = () => {
  return (
    <main className="row-span-3 flex h-full flex-col">
      <MessageList />
      <MessageInput />
    </main>
  );
};

export default ChatMain;
