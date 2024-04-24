import { apiSlice } from '../api/apiSlice';

import { UserData } from '@/types/UserData';
import { RootState } from '@/app/store';

export const participantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParticipants: builder.query<UserData[], string>({
      query: (chatRoomId) => `/chat-rooms/${chatRoomId}/participants`,
    }),
  }),
});

export const { useGetParticipantsQuery } = participantsApiSlice;

export const selectParticipantsByChatId =
  (chatRoomId: string) => (state: RootState) =>
    participantsApiSlice.endpoints.getParticipants.select(chatRoomId)(state);

export const selectParticipantsById =
  (chatRoomId: string, userId: string) => (state: RootState) =>
    participantsApiSlice.endpoints.getParticipants
      .select(chatRoomId)(state)
      .data?.find((u) => u._id === userId);
