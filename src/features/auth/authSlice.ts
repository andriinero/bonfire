import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import storage from '@/lib/storage';

import { AuthData } from '@/types/AuthData';
import { AppThunk, RootState } from '@/app/store';

type AuthState = {
  authData: AuthData | null;
  token: string | null;
};

const initialState: AuthState = {
  authData: null,
  token: null,
};

export const tokenInitialized =
  (token?: string): AppThunk =>
  (dispatch) => {
    if (token) {
      dispatch(setToken(token));
    } else {
      const storageToken = storage.getToken();
      dispatch(setToken(storageToken));
    }
  };

export const signedOut = (): AppThunk => (dispatch) => {
  storage.clearToken();
  dispatch(dataCleared());
  dispatch(clearToken());
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    dataCleared: (state) => {
      state.authData = null;
    },
  },
});

const { setToken, clearToken, dataCleared } = authSlice.actions;

export default authSlice;

export const selectIsSignedIn = (state: RootState) => !!state.auth.authData;

export const selectAuthUserId = (state: RootState) => state.auth.authData?.sub;

export const selectAuthUsername = (state: RootState) =>
  state.auth.authData?.username;

export const selectAuthUserRole = (state: RootState) =>
  state.auth.authData?.role;

export const selectAuthEmail = (state: RootState) => state.auth.authData?.email;

export const selectAuthRole = (state: RootState) => state.auth.authData?.role;

export const selectAuthProfileImage = (state: RootState) =>
  state.auth.authData?.profile_image;
