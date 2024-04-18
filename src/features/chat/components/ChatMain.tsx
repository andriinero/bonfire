import MessageInput from './MessageInput';
import MessageList from '../../messages/components/MessageList';

const ChatMain = () => {
  return (
    <div className="flex flex-col">
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatMain;
