import MessageBar from './MessageBar';
import MessageList from './MessageList';

const ChatMain = () => {
  return (
    <div className="flex flex-col">
      <MessageList />
      <MessageBar />
    </div>
  );
};

export default ChatMain;
