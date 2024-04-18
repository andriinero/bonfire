import { MessageData } from '@/types/MessageData';

type ActionMessageProps = { body: string };

const ActionMessage = ({ body }: ActionMessageProps) => {
  return (
    <li className="flex justify-center text-sm">
      <p className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">{body}</p>
    </li>
  );
};

export default ActionMessage;
