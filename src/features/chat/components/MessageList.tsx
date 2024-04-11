import { ReactNode } from 'react';

import cn from '@/utils/cn';
import MessageItem from './MessageItem';
import { testMessages } from '@/data/testData';

const MessageList = () => {
  const messageList = testMessages;

  return (
    <div className="flex flex-col gap-6">
      {messageList.map((m) => (
        <MessageItem {...m} />
      ))}
    </div>
  );
};

export default MessageList;
