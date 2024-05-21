import { useAppDispatch } from '@/app/hooks';
import { useState } from 'react';

import {
  contactsApiSlice,
  useGetContactPageCountQuery,
} from '../contactsSlice';

const useContactInfiniteScroll = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data: totalPageCount } = useGetContactPageCountQuery();

  const hasMore = currentPage < (totalPageCount || 0);

  const dispatch = useAppDispatch();

  const fetchNext = async (): Promise<void> => {
    const nextPage = currentPage + 1;
    if (hasMore) {
      await dispatch(
        contactsApiSlice.endpoints.getContacts.initiate(nextPage),
      ).unwrap();
      setCurrentPage(currentPage + 1);
    }
  };

  return { hasMore, fetchNext };
};

export default useContactInfiniteScroll;
