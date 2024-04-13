import MessageItem from './MessageItem';
import { testMessages } from '@/data/testData';

const MessageList = () => {
  const messageList = testMessages;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      {messageList.map((m) => (
        <MessageItem key={m._id} {...m} />
      ))}
    </div>
  );
};

export default MessageList;
