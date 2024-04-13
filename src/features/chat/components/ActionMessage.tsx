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
      <p className="rounded-full bg-gray-100 px-2 py-1 text-gray-800">{body}</p>
    </div>
  );
};

export default ActionMessage;
