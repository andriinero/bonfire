import cn from '@/utils/cn';

import { useGetChatsQuery } from '../chatsSlice';

import Spinner from '@/components/general/Spinner';
import ChatsItem from './ChatsItem';
import ErrorMessage from '@/components/general/ErrorMessage';

type ChatsListProps = { className?: string };

const ChatsList = ({ className }: ChatsListProps) => {
  const {
    data: chatList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetChatsQuery();

  return isFetching || isLoading ? (
    <Spinner />
  ) : isSuccess ? (
    <ul className={cn('space-y-2', className)}>
      {chatList!.map((c) => (
        <ChatsItem key={c._id} chatId={c._id} />
      ))}
    </ul>
  ) : (
    <ErrorMessage />
  );
};

export default ChatsList;
