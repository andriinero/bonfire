import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '@/app/store';

export const apiSlice = createApi({
  tagTypes: ['authData', 'chatRooms'],
  keepUnusedDataFor: 100000,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: () => ({}),
});
