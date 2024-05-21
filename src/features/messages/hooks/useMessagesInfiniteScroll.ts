import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  messagesApiSlice,
  pageCountIncreased,
  selectMessageListState,
  useGetMessagesPageCountQuery,
} from '../messagesSlice';

const useMessagesInfiniteScroll = (chatRoomId: string) => {
  const { data: totalPageCount } = useGetMessagesPageCountQuery({ chatRoomId });
  const { currentPage } = useAppSelector(selectMessageListState(chatRoomId));

  const hasMore = currentPage < (totalPageCount || 0);

  const dispatch = useAppDispatch();

  const fetchNext = async (): Promise<void> => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPageCount!) {
      await dispatch(
        messagesApiSlice.endpoints.getMessages.initiate({
          chatRoomId,
          page: nextPage,
        }),
      ).unwrap();
      dispatch(pageCountIncreased(chatRoomId));
    }
  };

  return { fetchNext, currentPage, hasMore };
};

export default useMessagesInfiniteScroll;
