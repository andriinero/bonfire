import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import type { RootState } from '@/app/store';
import type { Notification } from '@/types/Notification';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getErrorData } from '@/utils/getErrorData';
import { PushNotificationType } from '@/types/PushNotification';
import { pushNotificationAdded } from '../pushNotifications/pushNotificationsSlice';

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
      query: ({ page }) => `/profile/notifications?page=${page}`,
    }),
    deleteAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: `/profile/notifications`,
        method: 'DELETE',
      }),
    }),
    postMarkAsRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/profile/notifications/${id}/mark-as-read`,
        method: 'POST',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          notificationsApiSlice.util.updateQueryData(
            'getNotifications',
            { page: 0 },
            (draft) => {
              const index = draft.findIndex((n) => n.id === id);
              if (index > -1) draft[index].isRead = true;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          const errorData = getErrorData((err as { error: unknown }).error);
          dispatch(
            pushNotificationAdded({
              body: `Mark as read: "${errorData.message}"`,
              type: PushNotificationType.ERROR,
            }),
          );
        }
      },
    }),
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/profile/notifications/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          notificationsApiSlice.util.updateQueryData(
            'getNotifications',
            { page: 0 },
            (draft) => {
              const index = draft.findIndex((n) => n.id === id);
              if (index > -1) draft.splice(index, 1);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          const errorData = getErrorData((err as { error: unknown }).error);
          dispatch(
            pushNotificationAdded({
              body: `Dismiss notification: "${errorData.message}"`,
              type: PushNotificationType.ERROR,
            }),
          );
        }
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  usePostMarkAsReadMutation,
  useDeleteAllNotificationsMutation,
  useDeleteNotificationMutation,
} = notificationsApiSlice;

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
