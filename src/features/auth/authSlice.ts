import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import storage from '@/lib/storage';

import { AppThunk, RootState } from '@/app/store';
import { AuthData } from '@/types/AuthData';
import { ErrorData } from '@/types/ErrorData';

type AuthState = {
  authData: AuthData | null;
  authDataFetchedState: 'idle' | 'loading' | 'success' | 'failure';
  signInPostedState: 'idle' | 'loading' | 'success' | 'failure';
};

const initialState: AuthState = {
  authData: null,
  authDataFetchedState: 'idle',
  signInPostedState: 'idle',
};

export const authDataFetched = createAsyncThunk<
  AuthData,
  void,
  { rejectValue: ErrorData }
>('auth/authDataFetched', async (_, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data } = await axios.get('http://localhost:3000/api/auth/data', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
});

export const signInPosted = createAsyncThunk<
  { message: string; token: string },
  { email: string; password: string },
  { rejectValue: ErrorData }
>('auth/singInPosted', async (userData, { rejectWithValue, dispatch }) => {
  const { data } = await axios.post<{ message: string; token: string }>(
    'http://localhost:3000/api/auth/sign-in',
    userData,
  );

  storage.setToken(data.token);

  return data;
});

export const signedOut = (): AppThunk => (dispatch) => {
  dispatch(dataCleared());
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    dataCleared: (state) => {
      state.authData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authDataFetched.pending, (state) => {
        state.signInPostedState = 'loading';
      })
      .addCase(authDataFetched.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.signInPostedState = 'success';
      })
      .addCase(authDataFetched.rejected, (state) => {
        state.signInPostedState = 'failure';
      });
    builder
      .addCase(signInPosted.pending, (state) => {
        state.signInPostedState = 'loading';
      })
      .addCase(signInPosted.fulfilled, (state) => {
        state.signInPostedState = 'success';
      })
      .addCase(signInPosted.rejected, (state) => {
        state.signInPostedState = 'failure';
      });
  },
});

const { dataCleared } = authSlice.actions;

export default authSlice;

export const selectSignInPostedState = (state: RootState) =>
  state.auth.signInPostedState;

export const selectAuthUserId = (state: RootState) => state.auth.authData?.sub;

export const selectAuthUsername = (state: RootState) =>
  state.auth.authData?.username;

export const selectAuthUserRole = (state: RootState) =>
  state.auth.authData?.role;

export const selectIsSignedIn = (state: RootState) =>
  Boolean(state.auth.authData);
