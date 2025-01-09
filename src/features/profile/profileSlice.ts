import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TProfilePatch } from './components/ProfileEditPanel';

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
      query: (body) => ({
        url: `/profile`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { usePatchProfileMutation } = profileApiSlice;

export const { profileEditPanelStateSet } = profileSlice.actions;

export const selectIsProfileEditPanelOpen = (state: RootState) =>
  state.profile.isProfilePanelOpen;

export default profileSlice;
