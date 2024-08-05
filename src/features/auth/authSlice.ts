import { createSlice } from '@reduxjs/toolkit';

import Storage from '@/lib/Storage';
import { getErrorData } from '@/utils/getErrorData';

import { apiSlice } from '../api/apiSlice';
import { pushNotificationAdded } from '../pushNotifications/pushNotificationsSlice';

import type { AppThunk, RootState } from '@/app/store';
import type { AuthData } from '@/types/AuthData';
import { PushNotificationType } from '@/types/PushNotification';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TSignInBody } from './components/SignInPanel';
import type { TSignUpBody } from './components/SignUpPanel';

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
      Storage.setToken(token);
      dispatch(tokenSet(token));
    } else {
      const storageToken = Storage.getToken();
      dispatch(tokenSet(storageToken));
    }
  };

export const signedOut = (): AppThunk => (dispatch) => {
  Storage.clearToken();
  dispatch(authDataCleared());
  dispatch(tokenCleared());
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthData: builder.query<AuthData, void>({
      query: () => '/auth/data',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(authDataSet(data));
        } catch (err) {
          const errorData = getErrorData(err);
          console.error(errorData.message);
        }
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
          await queryFulfilled;
          dispatch(
            pushNotificationAdded({
              body: 'Login success',
              type: PushNotificationType.SUCCESS,
            }),
          );
        } catch (err) {
          const errorData = getErrorData((err as { error: unknown }).error);
          dispatch(
            pushNotificationAdded({
              body: errorData.message,
              type: PushNotificationType.ERROR,
            }),
          );
        }
      },
    }),
    postSignUp: builder.mutation<{ message: string }, TSignUpBody>({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            pushNotificationAdded({
              body: 'Account created',
              type: PushNotificationType.SUCCESS,
            }),
          );
        } catch (err) {
          console.error(err);
          const errorData = getErrorData((err as { error: unknown }).error);
          dispatch(
            pushNotificationAdded({
              body: errorData.message,
              list: errorData.list,
              type: PushNotificationType.ERROR,
            }),
          );
        }
      },
    }),
  }),
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authDataSet: (state, action: PayloadAction<AuthData>) => {
      state.authData = action.payload;
    },
    authDataCleared: (state) => {
      state.authData = null;
    },
    tokenSet: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    tokenCleared: (state) => {
      state.token = null;
    },
  },
});

const { authDataSet, tokenSet, tokenCleared, authDataCleared } =
  authSlice.actions;

export const {
  useGetAuthDataQuery,
  usePostSignInMutation,
  usePostSignUpMutation,
} = authApiSlice;

export default authSlice;

export const selectAuthData = (state: RootState) => state.auth.authData;

export const selectIsSignedIn = (state: RootState) => !!state.auth.authData;

export const selectAuthToken = (state: RootState) => state.auth.token;

export const selectAuthUserId = (state: RootState) => state.auth.authData?.sub;

export const selectAuthUsername = (state: RootState) =>
  state.auth.authData?.username;

export const selectAuthUserRole = (state: RootState) =>
  state.auth.authData?.role;

export const selectAuthEmail = (state: RootState) => state.auth.authData?.email;

export const selectAuthRole = (state: RootState) => state.auth.authData?.role;

export const selectAuthProfileImage = (state: RootState) =>
  state.auth.authData?.profile_image;
