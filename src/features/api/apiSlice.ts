import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export type postsApiResponse = {};

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (build) => ({
    getChats: build.query<postsApiResponse, number>({
      query: (limit = 10) => `/chats?limit=${limit}`,
    }),
  }),
});

export default apiSlice;
