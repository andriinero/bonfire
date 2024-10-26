import { isAction, isAnyOf } from '@reduxjs/toolkit';

import { connectionCreated } from '@/features/socket/socketSlice';

import Storage from '@/lib/Storage';
import SocketClient from '@/services/SocketClient';

import type { RootState } from '@/app/store';
import type { Middleware } from '@reduxjs/toolkit';

export const createSocketMiddleware = (): Middleware<unknown, RootState> => {
  const token = Storage.getToken();
  const socketClient = SocketClient.instance;
  socketClient.createConnection(token);

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
        socketClient.socket.emit('message:send');
        break;
    }

    return next(action);
  };
};
