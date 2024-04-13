import { ChatData } from '@/types/ChatData';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (build) => ({
    getChats: build.query<ChatData[], void>({
      query: () => `/chat-rooms`,
    }),
  }),
});

export const { useGetChatsQuery } = apiSlice;
