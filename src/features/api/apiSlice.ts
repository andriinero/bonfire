import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '@/app/store';
import { AuthData } from '@/types/AuthData';
import { ChatData } from '@/types/ChatData';
import { TSignInBody } from '../auth/components/SignInPanel';

export const apiSlice = createApi({
  tagTypes: ['authData'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChats: builder.query<ChatData[], void>({
      query: () => `/chat-rooms`,
      providesTags: ['authData'],
    }),
    getAuthData: builder.query<AuthData, void>({
      query: () => '/auth/data',
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
      invalidatesTags: ['authData'],
    }),
  }),
});

export const { useGetChatsQuery, useGetAuthDataQuery, usePostSignInMutation } =
  apiSlice;
