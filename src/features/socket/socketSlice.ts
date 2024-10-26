import { createAction } from '@reduxjs/toolkit';

const name = 'socket';

export const connectionCreated = createAction<{ token: string }>(
  `${name}/connectionCreated`,
);

export const disconnected = createAction(`${name}/disconnected`);

export const eventListenerAdded = createAction<{
  eventName: string;
  listener: () => void;
}>(`${name}/eventListenerAdded`);

export const eventListenerRemoved = createAction<{
  eventName: string;
  listener: () => void;
}>(`${name}/eventListenerRemoved`);

export const messageSent = createAction<{ message: string }>(
  `${name}/connectionCreated`,
);
