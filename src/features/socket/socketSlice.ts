import { createAction } from '@reduxjs/toolkit';

const name = 'socket';

export type SocketHandler = (...args: unknown[]) => void;

export const connectionCreated = createAction<{ token: string }>(
  `${name}/connectionCreated`,
);

export const disconnected = createAction(`${name}/disconnected`);

export const messageSent = createAction<{ message: string }>(
  `${name}/connectionCreated`,
);
