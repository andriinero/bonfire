import { ReactNode } from 'react';

import cn from '@/utils/cn';
import { MessageData } from '@/types/MessageData';
import UserIcon from '@/components/general/UserIcon';
import TimeStamp from '@/components/general/TimeStamp';
import { useAppSelector } from '@/app/hooks';
import { selectAuthUserId } from '@/features/auth/authSlice';
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
