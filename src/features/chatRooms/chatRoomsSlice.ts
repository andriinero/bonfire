import { apiSlice } from '../api/apiSlice';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { ChatRoom } from '@/types/ChatRoom';
import { RootState } from '@/app/store';

type ChatRoomState = {
  isCreateChatRoomOpen: boolean;
};

const initialState: ChatRoomState = {
  isCreateChatRoomOpen: false,
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
  },
});

export const chatRoomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatRooms: builder.query<ChatRoom[], void>({
      query: () => `/chat-rooms`,
      providesTags: ['authData'],
    }),
  }),
});

export const { createChatRoomOpened, createChatRoomClosed } =
  chatRoomSlice.actions;

export const { useGetChatRoomsQuery } = chatRoomsApiSlice;

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
