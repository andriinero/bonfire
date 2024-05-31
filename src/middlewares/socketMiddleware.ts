import { isAction, isAnyOf } from '@reduxjs/toolkit';

import Storage from '@/lib/Storage';
import SocketConnection from '@/services/SocketConnection';

import { connectionCreated } from '@/features/socket/socketSlice';

import type { RootState } from '@/app/store';
import type { Middleware } from '@reduxjs/toolkit';

export const createSocketMiddleware = (): Middleware<unknown, RootState> => {
  const token = Storage.getToken();
  const socketConnection = new SocketConnection(token);

  return () => (next) => (action) => {
    if (!isAction(action)) return next(action);

    const hasToken = isAnyOf(connectionCreated);

    switch (action.type) {
      case 'socket/connectionCreated':
        if (hasToken(action))
          socketConnection.createNewConnection(action.payload.token);

        socketConnection.socket.on('message:receive', () => {});
        break;
      case 'socket/connected':
        socketConnection.connect();
        break;
      case 'socket/disconnected':
        socketConnection.disconnect();
        break;
    }

    return next(action);
  };
};
