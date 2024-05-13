import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import type { RootState } from '@/app/store';
import type { ChatRoom } from '@/types/ChatRoom';
import type { PayloadAction } from '@reduxjs/toolkit';

type ChatRoomState = {
  isCreateChatRoomModalOpen: boolean;
  chatRoomsInitQueue: string[];
};

const initialState: ChatRoomState = {
  isCreateChatRoomModalOpen: false,
  chatRoomsInitQueue: [],
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    createChatRoomOpened: (state) => {
      state.isCreateChatRoomModalOpen = true;
    },
    createChatRoomClosed: (state) => {
      state.isCreateChatRoomModalOpen = false;
    },
    chatRoomLoadingStarted: (
      state,
      { payload: chatRoomId }: PayloadAction<string>,
    ) => {
      state.chatRoomsInitQueue.push(chatRoomId);
    },
    chatRoomLoadingFinished: (
      state,
      { payload: chatRoomId }: PayloadAction<string>,
    ) => {
      state.chatRoomsInitQueue = state.chatRoomsInitQueue.filter(
        (c) => c !== chatRoomId,
      );
    },
  },
});

export const chatRoomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatRooms: builder.query<ChatRoom[], void>({
      query: () => `/chat-rooms`,
      providesTags: ['chatRooms'],
    }),
    postChatRoom: builder.mutation<void, { participantUsername: string }>({
      query: (body) => ({ url: '/chat-rooms', method: 'POST', body }),
      invalidatesTags: ['chatRooms'],
    }),
  }),
});

export const {
  createChatRoomOpened,
  createChatRoomClosed,
  chatRoomLoadingStarted,
  chatRoomLoadingFinished,
} = chatRoomSlice.actions;

export const { useGetChatRoomsQuery, usePostChatRoomMutation } =
  chatRoomsApiSlice;

export default chatRoomSlice;

export const selectIsCreateChatRoomModalOpen = (state: RootState) =>
  state.chatRoom.isCreateChatRoomModalOpen;

export const selectChatRoomsListResult =
  chatRoomsApiSlice.endpoints.getChatRooms.select();

export const selectChatRoomsList = createSelector(
  selectChatRoomsListResult,
  (chatList) => chatList.data ?? [],
);

export const selectChatRoomById = (chatId: string) =>
  createSelector(selectChatRoomsList, (chatList) =>
    chatList.find((c: ChatRoom) => c._id === chatId),
  );

export const selectIsChatRoomsLoading = (state: RootState) =>
  state.chatRoom.chatRoomsInitQueue.length > 0;
