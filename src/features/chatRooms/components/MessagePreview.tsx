import cn from '@/utils/cn';

import { MessageType } from '@/types/MessageType';
import { MessageData } from '@/types/MessageData';

type MessagePreviewProps = Pick<MessageData, 'type' | 'body'>;

const MessagePreview = ({ type, body }: MessagePreviewProps) => {
  return (
    <p
      className={cn('text-ellipsis text-gray-500', {
        'font-medium': type === MessageType.ACTION,
      })}
    >
      {body}
    </p>
  );
};

export default MessagePreview;
