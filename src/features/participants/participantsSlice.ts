import { apiSlice } from '../api/apiSlice';

import type { User } from '@/types/User';
import type { RootState } from '@/app/store';

export const participantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParticipants: builder.query<User[], string>({
      query: (chatRoomId) => `/chat-rooms/${chatRoomId}/participants`,
    }),
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

export const { useGetParticipantsQuery, usePostParticipantMutation } =
  participantsApiSlice;

export const selectParticipantsByChatId =
  (chatRoomId: string) => (state: RootState) =>
    participantsApiSlice.endpoints.getParticipants.select(chatRoomId)(state)
      .data;

export const selectParticipantById =
  (chatRoomId: string, userId: string) => (state: RootState) =>
    participantsApiSlice.endpoints.getParticipants
      .select(chatRoomId)(state)
      .data?.find((u) => u._id === userId);
