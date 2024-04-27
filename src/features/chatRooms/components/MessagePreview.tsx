import cn from '@/utils/cn';

import { MessageType } from '@/types/MessageType';
import { Message } from '@/types/Message';

type MessagePreviewProps = Pick<Message, 'type' | 'body'>;

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
