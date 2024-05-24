import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

import { selectAuthToken } from '@/features/auth/authSlice';

const useOnlineConnection = () => {
  const token = useAppSelector(selectAuthToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      const socket = io('http://localhost:8080/', {
        transports: ['polling'],
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
      });

      return () => {
        socket.close();
      };
    }
  }, [dispatch, token]);
};

export default useOnlineConnection;
