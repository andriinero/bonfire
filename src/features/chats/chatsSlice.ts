import { createSelector } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';
import { ChatData } from '@/types/ChatData';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<ChatData[], void>({
      query: () => `/chat-rooms`,
      providesTags: ['authData'],
    }),
  }),
});

export const { useGetChatsQuery } = extendedApiSlice;

export const selectChatListResult =
  extendedApiSlice.endpoints.getChats.select();

export const selectChatList = createSelector(
  selectChatListResult,
  (chatList) => chatList.data ?? [],
);

export const selectChatById = (chatId: string) =>
  createSelector(selectChatList, (chatList) =>
    chatList.find((c: ChatData) => c._id === chatId),
  );

export const selectParticipantListByChatId = (chatId: string) =>
  createSelector(
    selectChatList,
    (chatList) =>
      chatList.find((c: ChatData) => c._id === chatId)?.participants,
  );
