import { apiSlice } from '../api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';

import { ChatData } from '@/types/ChatData';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatRooms: builder.query<ChatData[], void>({
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
    chatList.find((c: ChatData) => c._id === chatId),
  );

export const selectParticipantsByChatRoomId = (chatId: string) =>
  createSelector(
    selectChatRoomsList,
    (chatList) =>
      chatList.find((c: ChatData) => c._id === chatId)?.participants,
  );
