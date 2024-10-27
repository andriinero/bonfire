import { createAction } from '@reduxjs/toolkit';

const name = 'socket';

export const connectionCreated = createAction<{ token: string }>(
  `${name}/connectionCreated`,
);

export const disconnected = createAction(`${name}/disconnected`);

export const messageSent = createAction<{
  chatRoomId: string;
  user: string;
  body: string;
  reply?: string;
}>(`${name}/connectionCreated`);
