import { apiSlice } from '../api/apiSlice';

import { RootState } from '@/app/store';
import { MessageData } from '@/types/MessageData';

export type TPostMessageBody = {
  user: string;
  body: string;
  reply?: string;
};

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<MessageData[], string>({
      query: (chatRoomId) => `/chat-rooms/${chatRoomId}/messages`,
    }),
    postMessage: builder.mutation<
      MessageData,
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
              draft.push(result);
            },
          ),
        );
      },
    }),
  }),
});

export const { useGetMessagesQuery, usePostMessageMutation } = messagesApiSlice;

export const selectMessagesByChatId =
  (chatRoomId: string) => (state: RootState) =>
    messagesApiSlice.endpoints.getMessages.select(chatRoomId)(state).data;

export const selectMessageById =
  (chatRoomId: string, messageId: string) => (state: RootState) =>
    messagesApiSlice.endpoints.getMessages
      .select(chatRoomId)(state)
      .data?.find((m) => m._id === messageId);
