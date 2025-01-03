import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect, useRef } from 'react';

import { selectShouldScrollDown, shouldScrollDownSet } from '../messagesSlice';

const useScrollDownMessageList = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const shouldScrollDown = useAppSelector(selectShouldScrollDown);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScrollToBottom = () => {
      if (listRef.current) {
        const ul = listRef.current;
        const scrollHeight = listRef.current.scrollHeight;
        ul.scrollTo(0, scrollHeight);
      }
    };

    if (shouldScrollDown && listRef.current) {
      handleScrollToBottom();
      dispatch(shouldScrollDownSet(false));
    }
  }, [shouldScrollDown, dispatch]);

  return { listRef };
};

export default useScrollDownMessageList;
