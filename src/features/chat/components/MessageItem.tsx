import { MessageData } from '@/types/MessageData';
import UserMessage from './UserMessage';
import ActionMessage from './ActionMessage';

type MessageItemProps = {} & MessageData;

const MessageItem = (messageProps: MessageItemProps) => {
  return messageProps.type === 'message' ? (
    <UserMessage {...messageProps} />
  ) : (
    <ActionMessage {...messageProps} />
  );
};

export default MessageItem;
