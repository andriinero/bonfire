import cn from '@/utils/cn';

import { MessageType } from '@/types/MessageType';

import { Message } from '@/types/Message';

type MessagePreviewProps = { className?: string } & Pick<
  Message,
  'type' | 'body'
>;

const MessagePreview = ({ type, body, className }: MessagePreviewProps) => {
  return (
    <p
      className={cn('line-clamp-1 text-sm text-gray-500', className, {
        'font-medium': type === MessageType.ACTION,
      })}
    >
      {body}
    </p>
  );
};

export default MessagePreview;
