import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiSlice } from '@/features/api/apiSlice';
import authSlice from '@/features/auth/authSlice';
import chatSlice from '@/features/chat/chatSlice';
import messagesSlice from '@/features/messages/messagesSlice';
import chatRoomSlice from '@/features/chatRooms/chatRoomsSlice';
import contactsSlice from '@/features/contacts/contactsSlice';

const rootReducer = combineSlices(
  authSlice,
  chatSlice,
  apiSlice,
  messagesSlice,
  chatRoomSlice,
  contactsSlice,
);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware);
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
