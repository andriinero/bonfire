import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectAuthToken } from '@/features/auth/authSlice';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocketConnection = () => {
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

export default useSocketConnection;
