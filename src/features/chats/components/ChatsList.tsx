import { useAppSelector } from '@/app/hooks';

import cn from '@/utils/cn';

import { selectChatsList } from '../chatsSlice';

import ChatsItem from './ChatsItem';

type ChatsListProps = { className?: string };

const ChatsList = ({ className }: ChatsListProps) => {
  const list = useAppSelector(selectChatsList);

  return (
    <ul className={cn('', className)}>
      {list.map((chat) => (
        <ChatsItem key={chat._id} chatId={chat._id} />
      ))}
    </ul>
  );
};

export default ChatsList;
