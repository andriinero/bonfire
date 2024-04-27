import { apiSlice } from '../api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';

import { ChatRoom } from '@/types/ChatRoom';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatRooms: builder.query<ChatRoom[], void>({
      query: () => `/chat-rooms`,
      providesTags: ['authData'],
    }),
  }),
});

export const { useGetChatRoomsQuery } = extendedApiSlice;

export const selectChatRoomsListResult =
  extendedApiSlice.endpoints.getChatRooms.select();

export const selectChatRoomsList = createSelector(
  selectChatRoomsListResult,
  (chatList) => chatList.data ?? [],
);

export const selectChatRoomById = (chatId: string) =>
  createSelector(selectChatRoomsList, (chatList) =>
    chatList.find((c: ChatRoom) => c._id === chatId),
  );
