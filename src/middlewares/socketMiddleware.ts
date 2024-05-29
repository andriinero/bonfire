import { isAction } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import storage from '@/lib/storage';

import type { RootState } from '@/app/store';
import type { Middleware } from '@reduxjs/toolkit';

export const createSocketMiddleware = (
  url: string,
): Middleware<unknown, RootState> => {
  const token = storage.getToken();
  const socket = io(url, {
    transports: ['polling'],
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
    autoConnect: false,
  });

  return () => (next) => (action) => {
    if (!isAction(action)) return next(action);

    switch (action.type) {
      case 'socket/connected':
        socket.connect();
        break;
      case 'socket/disconnected':
        socket.close();
        break;
    }

    return next(action);
  };
};
