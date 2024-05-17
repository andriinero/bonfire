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
    createChatRoomModalOpened: (state) => {
      state.isCreateChatRoomModalOpen = true;
    },
    createChatRoomModalClosed: (state) => {
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
    getChatRooms: builder.query<ChatRoom[], { page: number }>({
      providesTags: ['chatRooms'],
      query: ({ page }) => `/chat-rooms?page=${page ?? 0}`,
    }),
    getChatRoomsCount: builder.query<number, void>({
      query: () => `/chat-rooms/count`,
    }),
    postChatRoom: builder.mutation<void, { participantUsername: string }>({
      invalidatesTags: ['chatRooms'],
      query: (body) => ({ url: '/chat-rooms', method: 'POST', body }),
    }),
  }),
});

export const {
  createChatRoomModalOpened,
  createChatRoomModalClosed,
  chatRoomLoadingStarted,
  chatRoomLoadingFinished,
} = chatRoomSlice.actions;

export const {
  useGetChatRoomsQuery,
  useGetChatRoomsCountQuery,
  usePostChatRoomMutation,
} = chatRoomsApiSlice;

export default chatRoomSlice;

export const selectIsCreateChatRoomModalOpen = (state: RootState) =>
  state.chatRoom.isCreateChatRoomModalOpen;

export const selectChatRoomsListResult = (page: number) =>
  chatRoomsApiSlice.endpoints.getChatRooms.select({ page });

export const selectChatRoomsList = (page: number) =>
  createSelector(
    selectChatRoomsListResult(page),
    (chatList) => chatList.data ?? [],
  );

export const selectChatRoomById = (chatId: string, page: number) =>
  createSelector(selectChatRoomsList(page), (chatList) =>
    chatList.find((c: ChatRoom) => c._id === chatId),
  );

export const selectIsChatRoomsLoading = (state: RootState) =>
  state.chatRoom.chatRoomsInitQueue.length > 0;
