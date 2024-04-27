import { apiSlice } from '../api/apiSlice';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import { Message } from '@/types/Message';

export type TPostMessageBody = {
  user: string;
  body: string;
  reply?: string;
};

type MessagesState = {
  shouldScrollDown: boolean;
};

const initialState: MessagesState = {
  shouldScrollDown: true,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    shouldScrollDownSet: (state, action: PayloadAction<boolean>) => {
      state.shouldScrollDown = action.payload;
    },
  },
});

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], string>({
      query: (chatRoomId) => `/chat-rooms/${chatRoomId}/messages`,
    }),
    postMessage: builder.mutation<
      Message,
      { chatRoomId: string; body: TPostMessageBody }
    >({
      query: ({ chatRoomId, body }) => ({
        url: `/chat-rooms/${chatRoomId}/messages`,
        method: 'POST',
        body,
      }),
      onQueryStarted: async ({ chatRoomId }, { dispatch, queryFulfilled }) => {
        const result = (await queryFulfilled).data;
        dispatch(
          messagesApiSlice.util.updateQueryData(
            'getMessages',
            chatRoomId,
            (draft) => {
              draft.unshift(result);
            },
          ),
        );
        dispatch(shouldScrollDownSet(true));
      },
    }),
  }),
});

export const { useGetMessagesQuery, usePostMessageMutation } = messagesApiSlice;

export const { shouldScrollDownSet } = messagesSlice.actions;

export default messagesSlice;

export const selectShouldScrollDown = (state: RootState) =>
  state.messages.shouldScrollDown;

export const selectMessagesByChatId =
  (chatRoomId: string) => (state: RootState) =>
    messagesApiSlice.endpoints.getMessages.select(chatRoomId)(state).data;

export const selectMessageById =
  (chatRoomId: string, messageId: string) => (state: RootState) =>
    messagesApiSlice.endpoints.getMessages
      .select(chatRoomId)(state)
      .data?.find((m) => m._id === messageId);
