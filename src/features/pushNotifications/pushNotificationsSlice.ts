import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';
import type { TPushNotificaiton } from '@/types/PushNotification';

type PushNotificationsState = {
  queue: TPushNotificaiton[];
};

const initialState: PushNotificationsState = {
  queue: [],
};

const pushNotificationsSlice = createSlice({
  name: 'pushNotifications',
  initialState,
  reducers: {
    pushNotificationAdded: {
      reducer: (
        state,
        { payload: notification }: PayloadAction<TPushNotificaiton>,
      ) => {
        state.queue.push(notification);
      },
      prepare: (notificationData: Omit<TPushNotificaiton, '_id'>) => {
        return {
          payload: {
            _id: 'id',
            body: notificationData.body,
            type: notificationData.type,
          },
        };
      },
    },
    pushNotificationRemoved: (
      state,
      { payload: id }: PayloadAction<string>,
    ) => {
      state.queue = state.queue.filter((n) => n._id !== id);
    },
  },
});

export const { pushNotificationAdded, pushNotificationRemoved } =
  pushNotificationsSlice.actions;

export default pushNotificationsSlice;

export const selectPushNotificationList = (state: RootState) =>
  state.pushNotifications.queue;
