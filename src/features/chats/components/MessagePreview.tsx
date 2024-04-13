import { useAppSelector } from '@/app/hooks';

import { selectMessageById } from '@/features/messages/messagesSlice';

import cn from '@/utils/cn';

import { MessageType } from '@/types/MessageType';

type MessagePreviewProps = { messageId: string };

const MessagePreview = ({ messageId }: MessagePreviewProps) => {
  const messageData = useAppSelector(selectMessageById(messageId));

  return messageData ? (
    <p
      className={cn('text-ellipsis text-sm text-gray-500', {
        'font-medium': messageData.type === MessageType.ACTION,
      })}
    >
      {messageData.body}
    </p>
  ) : (
    <p>No messages...</p>
  );
};

export default MessagePreview;
