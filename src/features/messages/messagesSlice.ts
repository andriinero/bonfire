import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import SocketClient from '@/services/SocketClient';

import type { RootState } from '@/app/store';
import type { Message } from '@/types/Message';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TPostMessageBody = {
  chatRoomId: string;
  body: string;
  reply?: string;
};

type MessagesState = {
  shouldScrollDown: boolean;
  listState: Record<string, { currentPage: number }>;
};

const initialState: MessagesState = {
  shouldScrollDown: true,
  listState: {},
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    shouldScrollDownSet: (state, action: PayloadAction<boolean>) => {
      state.shouldScrollDown = action.payload;
    },
    pageCountIncreased: (state, { payload }: PayloadAction<string>) => {
      if (!state.listState[payload].currentPage) {
        state.listState[payload].currentPage = 1;
      } else {
        state.listState[payload].currentPage += 1;
      }
    },
    messageListStateInitialized: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      if (!state.listState[payload]) {
        state.listState[payload] = { currentPage: 0 };
      }
    },
  },
});

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], { chatRoomId: string; page: number }>(
      {
        query: ({ chatRoomId, page }) =>
          `/chat-rooms/${chatRoomId}/messages?page=${page ?? 0}`,
        onCacheEntryAdded: async (
          _,
          { dispatch, cacheDataLoaded, cacheEntryRemoved },
        ) => {
          const socket = SocketClient.instance.socket;
          const updateCacheHandler = (message: Message) => {
            dispatch(
              messagesApiSlice.util.updateQueryData(
                'getMessages',
                { chatRoomId: message.chat_room, page: 0 },
                (draft) => {
                  draft.unshift(message);
                },
              ),
            );
          };

          await cacheDataLoaded;
          socket.removeAllListeners('message:receive');
          socket.on('message:receive', updateCacheHandler);

          await cacheEntryRemoved;
          socket.removeAllListeners('message:receive');
        },
      },
    ),
    getMessagesPageCount: builder.query<number, { chatRoomId: string }>({
      query: ({ chatRoomId }) =>
        `/chat-rooms/${chatRoomId}/messages/page-count`,
    }),
  }),
});

export const { useGetMessagesQuery, useGetMessagesPageCountQuery } =
  messagesApiSlice;

export const {
  shouldScrollDownSet,
  pageCountIncreased,
  messageListStateInitialized,
} = messagesSlice.actions;

export default messagesSlice;

export const selectMessageListState =
  (chatRoomId: string) => (state: RootState) =>
    state.messages.listState[chatRoomId];

export const selectShouldScrollDown = (state: RootState) =>
  state.messages.shouldScrollDown;

export const selectMessagesByChatId =
  (chatRoomId: string, page: number) => (state: RootState) =>
    messagesApiSlice.endpoints.getMessages.select({ chatRoomId, page })(state)
      .data;

export const selectMessageById =
  ({
    chatRoomId,
    page,
    id,
  }: {
    chatRoomId: string;
    page: number;
    id: string;
  }) =>
  (state: RootState) =>
    messagesApiSlice.endpoints.getMessages
      .select({ chatRoomId, page })(state)
      .data?.find((m) => m.id === id);
