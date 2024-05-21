import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  hasMoreSet,
  messagesApiSlice,
  pageCountIncreased,
  selectMessageListState,
  useGetMessagesPageCountQuery,
} from '../messagesSlice';

const useMessagesInfiniteScroll = (chatRoomId: string) => {
  const { data: totalPageCount } = useGetMessagesPageCountQuery({ chatRoomId });
  const { currentPage, hasMore } = useAppSelector(
    selectMessageListState(chatRoomId),
  );

  const nextPage = currentPage + 1;

  const dispatch = useAppDispatch();

  const fetchNext = async (): Promise<void> => {
    if (nextPage >= totalPageCount!) {
      dispatch(hasMoreSet({ chatRoomId, hasMore: false }));
    }
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
