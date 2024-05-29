import { createAction } from '@reduxjs/toolkit';

const name = 'socket';

export const connected = createAction(`${name}/connected`);

export const disconnected = createAction(`${name}/disconnected`);
