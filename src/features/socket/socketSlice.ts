import { createAction } from '@reduxjs/toolkit';

import type { TPostMessageBody } from '../messages/messagesSlice';

const name = 'socket';

export const connectionCreated = createAction<{ token: string }>(
  `${name}/connectionCreated`,
);

export const disconnected = createAction(`${name}/disconnected`);

export const messageSent = createAction<TPostMessageBody>(
  `${name}/messageSent`,
);
