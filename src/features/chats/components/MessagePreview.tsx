import { useAppSelector } from '@/app/hooks';

import { selectMessageById } from '@/features/messages/messagesSlice';

import cn from '@/utils/cn';

import { MessageType } from '@/types/MessageType';
import TimeStamp from '@/components/general/TimeStamp';

type MessagePreviewProps = { messageId: string };

const MessagePreview = ({ messageId }: MessagePreviewProps) => {
  const messageData = useAppSelector(selectMessageById(messageId));

  return messageData ? (
    <p
      className={cn('text-ellipsis text-sm text-neutral-600', {
        'font-medium text-neutral-800': messageData.type === MessageType.ACTION,
      })}
    >
      {messageData.body}
      <TimeStamp date={messageData.created.toString()} />
    </p>
  ) : (
    <p>No messages...</p>
  );
};

export default MessagePreview;
