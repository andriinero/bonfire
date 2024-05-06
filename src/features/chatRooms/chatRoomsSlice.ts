import { apiSlice } from '../api/apiSlice';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { ChatRoom } from '@/types/ChatRoom';
import { RootState } from '@/app/store';

type ChatRoomState = {
  isCreateChatRoomOpen: boolean;
  chatRoomsInitCount: number;
};

const initialState: ChatRoomState = {
  isCreateChatRoomOpen: false,
  chatRoomsInitCount: 0,
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    createChatRoomOpened: (state) => {
      state.isCreateChatRoomOpen = true;
    },
    createChatRoomClosed: (state) => {
      state.isCreateChatRoomOpen = false;
    },
    chatRoomLoadingStarted: (state) => {
      state.chatRoomsInitCount += 1;
    },
    chatRoomLoadingFinished: (state) => {
      state.chatRoomsInitCount -= 1;
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

export const selectIsCreateChatRoomOpen = (state: RootState) =>
  state.chatRoom.isCreateChatRoomOpen;

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
  state.chatRoom.chatRoomsInitCount > 0;
