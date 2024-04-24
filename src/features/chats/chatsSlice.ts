import { createSelector } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';
import { ChatData } from '@/types/ChatData';
import { UserData } from '@/types/UserData';
import { RootState } from '@/app/store';

export const chatsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<ChatData[], void>({
      providesTags: ['authData'],
      query: () => `/chat-rooms`,
    }),
    getParticipants: builder.query<UserData[], string>({
      query: (chatRoomId) => `/chat-rooms/${chatRoomId}/participants`,
    }),
  }),
});

export const { useGetChatsQuery, useGetParticipantsQuery } = chatsApiSlice;

// CHATS //

export const selectChatListResult = chatsApiSlice.endpoints.getChats.select();

export const selectChatList = createSelector(
  selectChatListResult,
  (chatList) => chatList.data ?? [],
);

export const selectChatById = (chatId: string) =>
  createSelector(selectChatList, (chatList) =>
    chatList.find((c: ChatData) => c._id === chatId),
  );

// PARTICIPANTS //

export const selectParticipantListByChatId = (chatId: string) =>
  createSelector(
    selectChatList,
    (chatList) =>
      chatList.find((c: ChatData) => c._id === chatId)?.participants,
  );

export const selectParticipantsByChatId =
  (chatRoomId: string) => (state: RootState) =>
    chatsApiSlice.endpoints.getParticipants.select(chatRoomId)(state);

export const selectParticipantsById =
  (chatRoomId: string, userId: string) => (state: RootState) =>
    chatsApiSlice.endpoints.getParticipants
      .select(chatRoomId)(state)
      .data?.find((u) => u._id === userId);
