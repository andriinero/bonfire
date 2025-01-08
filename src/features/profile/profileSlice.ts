import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TProfilePatch } from './components/ProfileEditPanel';

type NotificationsState = { isProfilePanelOpen: boolean };

const initialState: NotificationsState = { isProfilePanelOpen: false };

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationMenuStateSet: (state, actions: PayloadAction<boolean>) => {
      state.isProfilePanelOpen = actions.payload;
    },
  },
});

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    patchProfile: builder.mutation<void, TProfilePatch>({
      query: (body) => ({
        url: `/profile`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { usePatchProfileMutation } = notificationsApiSlice;

export const { notificationMenuStateSet } = notificationsSlice.actions;

export const selectIsProfilePanelOpen = (state: RootState) =>
  state.notifications.isNotificationMenuOpen;

export default notificationsSlice;
