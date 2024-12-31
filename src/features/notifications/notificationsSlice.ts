import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

type NotificationsState = { isNotificationMenuOpen: boolean };

const initialState: NotificationsState = { isNotificationMenuOpen: true };

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    openNotificationMenu: (state) => {
      state.isNotificationMenuOpen = true;
    },
    closeNotificationMenu: (state) => {
      state.isNotificationMenuOpen = true;
    },
  },
});

export const { openNotificationMenu, closeNotificationMenu } =
  notificationsSlice.actions;

export const selectIsNotificationMenuOpen = (state: RootState) =>
  state.notifications.isNotificationMenuOpen;

export default notificationsSlice;
