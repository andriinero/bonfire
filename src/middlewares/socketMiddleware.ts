import { isAction, isAnyOf } from '@reduxjs/toolkit';

import storage from '@/lib/storage';
import SocketConnection from '@/services/SocketConnection';

import { connectionCreated } from '@/features/socket/socketSlice';

import type { RootState } from '@/app/store';
import type { Middleware } from '@reduxjs/toolkit';

export const createSocketMiddleware = (): Middleware<unknown, RootState> => {
  const token = storage.getToken();
  const socket = new SocketConnection(token);

  return () => (next) => (action) => {
    if (!isAction(action)) return next(action);

    const hasToken = isAnyOf(connectionCreated);

    switch (action.type) {
      case 'socket/connectionCreated':
        if (hasToken(action)) socket.createConnection(action.payload.token);
        break;
      case 'socket/connected':
        socket.connect();
        break;
      case 'socket/disconnected':
        socket.disconnect();
        break;
    }

    return next(action);
  };
};
