import { UserData } from '@/types/UserData';
import { apiSlice } from '../api/apiSlice';
import { RootState } from '@/app/store';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserData[], string>({
      query: (chatRoomId) => `/chat-rooms/${chatRoomId}/participants`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersByChatId = (chatRoomId: string) => (state: RootState) =>
  usersApiSlice.endpoints.getUsers.select(chatRoomId)(state);

export const selectUserById =
  (chatRoomId: string, userId: string) => (state: RootState) =>
    usersApiSlice.endpoints.getUsers
      .select(chatRoomId)(state)
      .data?.find((u) => u._id === userId);
