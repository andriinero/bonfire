import { createSlice } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '@/app/store';
import { AuthData } from '@/types/AuthData';

type AuthState = {
  authData: AuthData | null;
};

const initialState: AuthState = {
  authData: null,
};

export const signedOut = (): AppThunk => (dispatch) => {
  dispatch(dataCleared());
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // FIXME: remove
    dataInitialized: (state) => {
      state.authData = {
        userId: '0',
        username: 'test user',
        userRole: 'guest',
      };
    },
    dataCleared: (state) => {
      state.authData = null;
    },
  },
});

const { dataCleared } = authSlice.actions;

export const { dataInitialized } = authSlice.actions;

export default authSlice;

export const selectAuthUserId = (state: RootState) =>
  state.auth.authData?.userId;

export const selectAuthUsername = (state: RootState) =>
  state.auth.authData?.username;

export const selectAuthUserRole = (state: RootState) =>
  state.auth.authData?.userRole;

export const selectIsSignedIn = (state: RootState) =>
  Boolean(state.auth.authData);
