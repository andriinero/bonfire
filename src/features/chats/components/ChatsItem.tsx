import { useAppSelector } from '@/app/hooks';

import { selectChatById } from '../chatsSlice';

type ChatsItemProps = {
  chatId: string;
};

const ChatsItem = ({ chatId }: ChatsItemProps) => {
  const data = useAppSelector(selectChatById(chatId));

  return (
    <div className="rounded-md bg-neutral-200 p-4">
      <div></div>
    </div>
  );
};

export default ChatsItem;
