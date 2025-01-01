import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import type { RootState } from '@/app/store';
import type { Notification } from '@/types/Notification';
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

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], { page: number }>({
      query: ({ page }) => `/notifications?page=${page}`,
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApiSlice;

export const { notificationMenuStateSet } = notificationsSlice.actions;

export const selectIsNotificationMenuOpen = (state: RootState) =>
  state.notifications.isNotificationMenuOpen;

export const selectNotificationById =
  ({ page, id }: { page: number; id: string }) =>
  (state: RootState) =>
    notificationsApiSlice.endpoints.getNotifications
      .select({ page })(state)
      .data?.find((m) => m.id === id);

export default notificationsSlice;
