import { isAction, isAnyOf } from '@reduxjs/toolkit';

import { connectionCreated, messageSent } from '@/features/socket/socketSlice';

import SocketClient from '@/services/SocketClient';

import type { RootState } from '@/app/store';
import type { Middleware } from '@reduxjs/toolkit';

export type SocketError = {
  status: string;
  data: { error: string };
};

export const createSocketMiddleware = (): Middleware<unknown, RootState> => {
  const socketClient = SocketClient.instance;

  return () => (next) => (action) => {
    if (!isAction(action)) return next(action);

    switch (action.type) {
      case 'socket/connectionCreated':
        if (isAnyOf(connectionCreated)(action))
          socketClient.createConnection(action.payload.token);
        break;
      case 'socket/disconnected':
        socketClient.disconnect();
        break;
      case 'socket/messageSent':
        if (isAnyOf(messageSent)(action))
          socketClient.socket.emit('message:send', action.payload);
        break;
    }

    return next(action);
  };
};
