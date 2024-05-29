import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';

import { selectAuthToken } from '@/features/auth/authSlice';
import { connected, disconnected } from '@/features/socket/socketSlice';

const useSocketConnection = () => {
  const token = useAppSelector(selectAuthToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) dispatch(connected());

    return () => {
      dispatch(disconnected());
    };
  }, [token, dispatch]);
};

export default useSocketConnection;
