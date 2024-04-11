import { ReactNode } from 'react';

import cn from '@/utils/cn';
import { MessageData } from '@/types/MessageData';

type ActionMessageProps = {} & MessageData;

const ActionMessage = ({
  _id,
  chat_room,
  user,
  body,
  created,
  reply,
  type,
}: ActionMessageProps) => {
  return (
    <div className="flex justify-center text-sm">
      <p className="rounded-full bg-neutral-100 px-2 py-1 text-neutral-800">
        {body}
      </p>
    </div>
  );
};

export default ActionMessage;
