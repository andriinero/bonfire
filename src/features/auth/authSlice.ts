import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import storage from '@/lib/storage';

import { apiSlice } from '../api/apiSlice';

import { AuthData } from '@/types/AuthData';
import { AppThunk, RootState } from '@/app/store';

import { TSignInBody } from './components/SignInPanel';

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
      storage.setToken(token);
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

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthData: builder.query<AuthData, void>({
      query: () => '/auth/data',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthData(data));
        } catch (err) {}
      },
    }),
    postSignIn: builder.mutation<
      { message: string; token: string },
      TSignInBody
    >({
      query: (body) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { token },
          } = await queryFulfilled;
          dispatch(tokenInitialized(token));
        } catch (err) {}
      },
    }),
  }),
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      state.authData = action.payload;
    },
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

const { setAuthData, setToken, clearToken, dataCleared } = authSlice.actions;

export const { useGetAuthDataQuery, usePostSignInMutation } = authApiSlice;

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
