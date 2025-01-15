import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import { getErrorData } from '@/utils/getErrorData';

import { pushNotificationAdded } from '../pushNotifications/pushNotificationsSlice';

import type { RootState } from '@/app/store';
import { PushNotificationType } from '@/types/PushNotification';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TProfilePatch } from './components/ProfileEditPanel';

type NotificationsState = { isProfileEditPanelOpen: boolean };

const initialState: NotificationsState = { isProfileEditPanelOpen: false };

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileEditPanelOpenStateSet: (state, actions: PayloadAction<boolean>) => {
      state.isProfileEditPanelOpen = actions.payload;
    },
  },
});

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    patchProfile: builder.mutation<void, TProfilePatch>({
      invalidatesTags: ['authData'],
      query: (body) => ({
        url: `/profile`,
        method: 'PATCH',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            pushNotificationAdded({
              body: 'Profile updated successfully',
              type: PushNotificationType.SUCCESS,
            }),
          );
        } catch (err) {
          const errorData = getErrorData((err as { error: unknown }).error);
          dispatch(
            pushNotificationAdded({
              body: `Update profile: "${errorData.message}"`,
              type: PushNotificationType.ERROR,
            }),
          );
        }
      },
    }),
  }),
});

export const { usePatchProfileMutation } = profileApiSlice;

export const { profileEditPanelOpenStateSet } = profileSlice.actions;

export const selectIsProfileEditPanelOpen = (state: RootState) =>
  state.profile.isProfileEditPanelOpen;

export default profileSlice;
