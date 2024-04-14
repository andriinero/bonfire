import { createSelector } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';

import { ChatData } from '@/types/ChatData';

export const selectChatListResult = apiSlice.endpoints.getChats.select();

export const selectChatList = createSelector(
  selectChatListResult,
  (chatList) => chatList.data ?? [],
);

export const selectChatById = (chatId: string) =>
  createSelector(selectChatList, (chatList: ChatData[]) =>
    chatList.find((c) => c._id === chatId),
  );

export const selectParticipantListByChatId = (chatId: string) =>
  createSelector(
    selectChatList,
    (chatList: ChatData[]) =>
      chatList.find((c) => c._id === chatId)?.participants,
  );
