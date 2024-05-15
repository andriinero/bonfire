import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';
import {
  PushNotificationType,
  type TPushNotification,
} from '@/types/PushNotification';
import type { PayloadAction } from '@reduxjs/toolkit';

type PushNotificationsState = {
  queue: TPushNotification[];
};

const initialState: PushNotificationsState = {
  queue: [
    {
      _id: 'test01',
      body: 'test notification',
      type: PushNotificationType.ERROR,
    },
    {
      _id: 'test02',
      body: 'test notification',
      type: PushNotificationType.SUCCESS,
    },
    {
      _id: 'test03',
      body: 'test notification',
      type: PushNotificationType.WARNING,
    },
  ],
};

const pushNotificationsSlice = createSlice({
  name: 'pushNotifications',
  initialState,
  reducers: {
    pushNotificationAdded: {
      reducer: (
        state,
        { payload: notification }: PayloadAction<TPushNotification>,
      ) => {
        state.queue.push(notification);
      },
      prepare: (notificationData: Omit<TPushNotification, '_id'>) => {
        return {
          payload: {
            _id: 'id',
            body: notificationData.body,
            type: notificationData.type,
            list: notificationData.list,
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

export const selectPushNotificationsList = (state: RootState) =>
  state.pushNotifications.queue;

export const selectPushNotificationById = (id: string) => (state: RootState) =>
  state.pushNotifications.queue.find((n) => n._id === id);
