import { useAppDispatch } from '@/app/hooks';
import { useState } from 'react';

import {
  chatRoomsApiSlice,
  useGetChatRoomsCountQuery,
} from '../chatRoomsSlice';

const useChatRoomInfiniteScroll = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data: totalPageCount } = useGetChatRoomsCountQuery();

  const hasMore = currentPage < (totalPageCount || 0);

  const dispatch = useAppDispatch();

  const fetchNext = async (): Promise<void> => {
    const nextPage = currentPage + 1;
    if (hasMore) {
      await dispatch(
        chatRoomsApiSlice.endpoints.getChatRooms.initiate(nextPage),
      ).unwrap();
      setCurrentPage(currentPage + 1);
    }
  };

  return { hasMore, fetchNext };
};

export default useChatRoomInfiniteScroll;
