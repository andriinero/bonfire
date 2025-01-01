import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';

type NotificationsState = { isNotificationMenuOpen: boolean };

const initialState: NotificationsState = { isNotificationMenuOpen: false };

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationMenuStateSet: (state, actions: PayloadAction<boolean>) => {
      state.isNotificationMenuOpen = actions.payload;
    },
  },
});

export const { notificationMenuStateSet } = notificationsSlice.actions;

export const selectIsNotificationMenuOpen = (state: RootState) =>
  state.notifications.isNotificationMenuOpen;

export default notificationsSlice;
