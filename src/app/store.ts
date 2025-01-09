import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { createSocketMiddleware } from '@/middlewares/socketMiddleware';

import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { apiSlice } from '@/features/api/apiSlice';
import authSlice from '@/features/auth/authSlice';
import chatSlice from '@/features/chat/chatSlice';
import chatRoomSlice from '@/features/chatRooms/chatRoomsSlice';
import contactsSlice from '@/features/contacts/contactsSlice';
import messagesSlice from '@/features/messages/messagesSlice';
import pushNotificationsSlice from '@/features/pushNotifications/pushNotificationsSlice';
import drawerSlice from '@/features/drawer/drawerSlice';
import notificationsSlice from '@/features/notifications/notificationsSlice';
import profileSlice from '@/features/profile/profileSlice';

const rootReducer = combineSlices(
  authSlice,
  chatSlice,
  apiSlice,
  messagesSlice,
  chatRoomSlice,
  contactsSlice,
  pushNotificationsSlice,
  drawerSlice,
  notificationsSlice,
  profileSlice,
);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(apiSlice.middleware)
        .concat(createSocketMiddleware());
    },
    preloadedState,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
