import { UserData } from '@/types/UserData';
import { apiSlice } from '../api/apiSlice';
import { RootState } from '@/app/store';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParticipants: builder.query<UserData[], string>({
      query: (chatRoomId) => `/chat-rooms/${chatRoomId}/participants`,
    }),
  }),
});

export const { useGetParticipantsQuery } = usersApiSlice;

export const selectParticipantsByChatId =
  (chatRoomId: string) => (state: RootState) =>
    usersApiSlice.endpoints.getParticipants.select(chatRoomId)(state);

export const selectParticipantsById =
  (chatRoomId: string, userId: string) => (state: RootState) =>
    usersApiSlice.endpoints.getParticipants
      .select(chatRoomId)(state)
      .data?.find((u) => u._id === userId);
