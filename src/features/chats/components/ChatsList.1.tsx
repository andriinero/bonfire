import cn from '@/utils/cn';
import ChatsItem from './ChatsItem';
import { useGetChatsQuery } from '@/features/api/apiSlice';
import Spinner from '@/components/general/Spinner';
import { ChatsListProps } from './ChatsList';

export const ChatsList = ({ className }: ChatsListProps) => {
  const {
    data: chatList, isLoading, isFetching, isSuccess,
  } = useGetChatsQuery();

  // FIXME: remove comment
  console.log(chatList);

  return isFetching || isLoading ? (
    <Spinner />
  ) : isSuccess ? (
    <ul className={cn('', className)}>
      {chatList!.map((c) => (
        <ChatsItem key={c._id} chatId={c._id} />
      ))}
    </ul>
  ) : (
    <Error />
  );
};
