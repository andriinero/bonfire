import { apiSlice } from '../api/apiSlice';

import { RootState } from '@/app/store';
import { MessageData } from '@/types/MessageData';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<MessageData[], string>({
      query: (chatRoomId) => `/chat-rooms/${chatRoomId}/messages`,
    }),
  }),
});

export const { useGetMessagesQuery } = extendedApiSlice;

export const selectMessagesByChatId =
  (chatRoomId: string) => (state: RootState) =>
    extendedApiSlice.endpoints.getMessages.select(chatRoomId)(state).data;

export const selectMessageById =
  (chatRoomId: string, messageId: string) => (state: RootState) =>
    extendedApiSlice.endpoints.getMessages
      .select(chatRoomId)(state)
      .data?.find((m) => m._id === messageId);
