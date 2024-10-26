import { isAction, isAnyOf } from '@reduxjs/toolkit';

import {
  connectionCreated,
  eventListenerAdded,
  eventListenerRemoved,
} from '@/features/socket/socketSlice';

import Storage from '@/lib/Storage';
import SocketConnection from '@/services/SocketConnection';

import type { RootState } from '@/app/store';
import type { Middleware } from '@reduxjs/toolkit';

export const createSocketMiddleware = (): Middleware<unknown, RootState> => {
  const token = Storage.getToken();
  const socketConnection = new SocketConnection(token);

  return () => (next) => (action) => {
    if (!isAction(action)) return next(action);

    switch (action.type) {
      case 'socket/connectionCreated':
        if (isAnyOf(connectionCreated)(action))
          socketConnection.createNewConnection(action.payload.token);
        break;
      case 'socket/disconnected':
        socketConnection.disconnect();
        break;
      case 'socket/on':
        if (isAnyOf(eventListenerAdded)(action)) {
          const { eventName, listener } = action.payload;
          socketConnection.on(eventName, listener);
        }
        break;
      case 'socket/off':
        if (isAnyOf(eventListenerRemoved)(action)) {
          const { eventName, listener } = action.payload;
          socketConnection.off(eventName, listener);
        }
        break;
      case 'socket/messageSent':
        socketConnection.socket.emit('message:send', () => {});
        break;
    }

    return next(action);
  };
};
