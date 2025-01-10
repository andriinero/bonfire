import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TProfilePatch } from './components/ProfileEditPanel';
import { pushNotificationAdded } from '../pushNotifications/pushNotificationsSlice';
import { PushNotificationType } from '@/types/PushNotification';
import { getErrorData } from '@/utils/getErrorData';

type NotificationsState = { isProfilePanelOpen: boolean };

const initialState: NotificationsState = { isProfilePanelOpen: false };

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileEditPanelStateSet: (state, actions: PayloadAction<boolean>) => {
      state.isProfilePanelOpen = actions.payload;
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

export const { profileEditPanelStateSet } = profileSlice.actions;

export const selectIsProfileEditPanelOpen = (state: RootState) =>
  state.profile.isProfilePanelOpen;

export default profileSlice;
