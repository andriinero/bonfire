import { useAppSelector } from '@/app/hooks';

import { selectMessageById } from '@/features/messages/messagesSlice';

import cn from '@/utils/cn';

import { MessageType } from '@/types/MessageType';
import { MessageData } from '@/types/MessageData';

type MessagePreviewProps = { message?: MessageData };

const MessagePreview = ({ message }: MessagePreviewProps) => {
  return message ? (
    <p
      className={cn('text-ellipsis text-sm text-gray-500', {
        'font-medium': message.type === MessageType.ACTION,
      })}
    >
      {message.body}
    </p>
  ) : (
    <p>No messages...</p>
  );
};

export default MessagePreview;
