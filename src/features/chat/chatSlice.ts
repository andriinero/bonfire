import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { apiSlice } from '../api/apiSlice';

type ChatState = {
  selectedChatId?: string;
  isSidebarOpen: boolean;
  isChatDrawerOpen: boolean;
  isAddParticipantFormOpen: boolean;
};

const initialState: ChatState = {
  selectedChatId: undefined,
  isSidebarOpen: true,
  isChatDrawerOpen: false,
  isAddParticipantFormOpen: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectedChatIdSet: (state, action: PayloadAction<string>) => {
      if (state.selectedChatId !== action.payload)
        state.selectedChatId = action.payload;
    },
    selectedChatCleared: (state) => {
      state.selectedChatId = undefined;
    },
    sidebarOpened: (state) => {
      state.isSidebarOpen = true;
    },
    sidebarClosed: (state) => {
      state.isSidebarOpen = false;
    },
    chatDrawerOpened: (state) => {
      state.isChatDrawerOpen = true;
    },
    chatDrawerClosed: (state) => {
      state.isChatDrawerOpen = false;
    },
    addParticipantFormOpened: (state) => {
      state.isAddParticipantFormOpen = true;
    },
    addParticipantFormClosed: (state) => {
      state.isAddParticipantFormOpen = false;
    },
  },
});

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postParticipant: builder.mutation<
      void,
      { chatRoomId: string; body: { participantUsername: string } }
    >({
      query: ({ chatRoomId, body }) => ({
        url: `/chat-rooms/${chatRoomId}/participants`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  selectedChatIdSet,
  selectedChatCleared,
  sidebarOpened,
  sidebarClosed,
  chatDrawerOpened,
  chatDrawerClosed,
  addParticipantFormOpened,
  addParticipantFormClosed,
} = chatSlice.actions;

export const { usePostParticipantMutation } = chatApiSlice;

export default chatSlice;

export const selectSelectedChatId = (state: RootState) =>
  state.chat.selectedChatId;

export const selectIsSidebarOpen = (state: RootState) =>
  state.chat.isSidebarOpen;

export const selectIsChatDrawerOpen = (state: RootState) =>
  state.chat.isChatDrawerOpen;

export const selectIsAddParticiapntFormOpen = (state: RootState) =>
  state.chat.isAddParticipantFormOpen;
