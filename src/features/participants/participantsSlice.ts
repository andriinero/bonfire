import { apiSlice } from '../api/apiSlice';

import { getErrorData } from '@/utils/getErrorData';

import { pushNotificationAdded } from '../pushNotifications/pushNotificationsSlice';

import type { RootState } from '@/app/store';
import { PushNotificationType } from '@/types/PushNotification';
import type { User } from '@/types/User';

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
      onQueryStarted: async (
        { body: { participantUsername } },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;
          dispatch(
            pushNotificationAdded({
              body: `Participant '${participantUsername}' added`,
              type: PushNotificationType.SUCCESS,
            }),
          );
        } catch (err) {
          const errorData = getErrorData((err as { error: unknown }).error);
          dispatch(
            pushNotificationAdded({
              body: `Add participant: "${errorData.message}"`,
              type: PushNotificationType.ERROR,
            }),
          );
        }
      },
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
      .data?.find((u) => u.id === userId);
