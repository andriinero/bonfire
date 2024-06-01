import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '@/app/store';
import EnvVars from '@/constants/EnvVars';

export const apiSlice = createApi({
  tagTypes: ['authData', 'chatRooms', 'contacts'],
  keepUnusedDataFor: 100000,
  baseQuery: fetchBaseQuery({
    baseUrl: EnvVars.RESTAPI_SERVER_URL + '/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: () => ({}),
});
