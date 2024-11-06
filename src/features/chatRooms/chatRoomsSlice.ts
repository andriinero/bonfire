import { createSelector, createSlice } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';
import { pushNotificationAdded } from '../pushNotifications/pushNotificationsSlice';

import { getErrorData } from '@/utils/getErrorData';

import type { RootState } from '@/app/store';
import type { ChatRoom } from '@/types/ChatRoom';
import { PushNotificationType } from '@/types/PushNotification';
import type { User } from '@/types/User';
import type { PayloadAction } from '@reduxjs/toolkit';

type ChatRoomState = {
  isCreateChatRoomModalOpen: boolean;
  chatRoomsInitQueue: string[];
  selectedContacts: User[];
};

const initialState: ChatRoomState = {
  isCreateChatRoomModalOpen: false,
  chatRoomsInitQueue: [],
  selectedContacts: [],
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    createChatRoomModalOpened: (state) => {
      state.isCreateChatRoomModalOpen = true;
    },
    createChatRoomModalClosed: (state) => {
      state.isCreateChatRoomModalOpen = false;
    },
    chatRoomLoadingStarted: (
      state,
      { payload: chatRoomId }: PayloadAction<string>,
    ) => {
      state.chatRoomsInitQueue.push(chatRoomId);
    },
    chatRoomLoadingFinished: (
      state,
      { payload: chatRoomId }: PayloadAction<string>,
    ) => {
      state.chatRoomsInitQueue = state.chatRoomsInitQueue.filter(
        (c) => c !== chatRoomId,
      );
    },
    selectedContactAdded: (state, action: PayloadAction<User>) => {
      state.selectedContacts.push(action.payload);
    },
    selectedContactRemoved: (state, action: PayloadAction<string>) => {
      state.selectedContacts = state.selectedContacts.filter(
        (user) => user._id !== action.payload,
      );
    },
    selectedContactReset: (state) => {
      state.selectedContacts.length = 0;
    },
  },
});

export const chatRoomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatRooms: builder.query<ChatRoom[], number>({
      providesTags: ['chatRooms'],
      query: (page) => `/chat-rooms?page=${page ?? 0}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (curItems, newItems, { arg: page }) => {
        if (page > 0) {
          curItems.push(...newItems);
        } else {
          curItems.length = 0;
          curItems.push(...newItems);
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getChatRoomsCount: builder.query<number, void>({
      query: () => `/chat-rooms/page-count`,
    }),
    postChatRoom: builder.mutation<void, { participantUsername: string }>({
      invalidatesTags: ['chatRooms'],
      query: (body) => ({ url: '/chat-rooms', method: 'POST', body }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            pushNotificationAdded({
              body: 'Chat successfully created',
              type: PushNotificationType.SUCCESS,
            }),
          );
        } catch (err) {
          const errorData = getErrorData((err as { error: unknown }).error);
          dispatch(
            pushNotificationAdded({
              body: `Create chat: "${errorData.message}"`,
              type: PushNotificationType.ERROR,
            }),
          );
        }
      },
    }),
    deleteChatRoom: builder.mutation<void, { chatRoomId: string }>({
      query: ({ chatRoomId }) => ({
        url: `/chat-rooms/${chatRoomId}/participants`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ chatRoomId }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          chatRoomsApiSlice.util.updateQueryData('getChatRooms', 0, (draft) => {
            const chatRoomIndex = draft.findIndex((c) => c._id === chatRoomId);
            if (chatRoomIndex > -1) draft.splice(chatRoomIndex, 1);
          }),
        );
        try {
          await queryFulfilled;
          dispatch(
            pushNotificationAdded({
              body: `Chat room deleted`,
              type: PushNotificationType.SUCCESS,
            }),
          );
        } catch (err) {
          patchResult.undo();
          const errorData = getErrorData((err as { error: unknown }).error);
          dispatch(
            pushNotificationAdded({
              body: `Delete chat: "${errorData.message}"`,
              type: PushNotificationType.ERROR,
            }),
          );
        }
      },
    }),
  }),
});

export const {
  createChatRoomModalOpened,
  createChatRoomModalClosed,
  chatRoomLoadingStarted,
  chatRoomLoadingFinished,
  selectedContactAdded,
  selectedContactRemoved,
  selectedContactReset,
} = chatRoomSlice.actions;

export const {
  useGetChatRoomsQuery,
  useGetChatRoomsCountQuery,
  usePostChatRoomMutation,
  useDeleteChatRoomMutation,
} = chatRoomsApiSlice;

export default chatRoomSlice;

export const selectIsCreateChatRoomModalOpen = (state: RootState) =>
  state.chatRoom.isCreateChatRoomModalOpen;

export const selectSelectedContacts = (state: RootState) =>
  state.chatRoom.selectedContacts;

export const selectChatRoomsListResult =
  chatRoomsApiSlice.endpoints.getChatRooms.select(0);

export const selectChatRoomsList = createSelector(
  selectChatRoomsListResult,
  (chatList) => chatList.data ?? [],
);

export const selectChatRoomById = (chatId: string) =>
  createSelector(selectChatRoomsList, (chatList) =>
    chatList.find((c: ChatRoom) => c._id === chatId),
  );

export const selectIsChatRoomsLoading = (state: RootState) =>
  state.chatRoom.chatRoomsInitQueue.length > 0;
