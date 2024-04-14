import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ChatMain = () => {
  return (
    <div className="flex flex-col">
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatMain;
