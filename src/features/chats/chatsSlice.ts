import { createSlice } from '@reduxjs/toolkit';

import { ChatData } from '@/types/ChatData';
import { RootState } from '@/app/store';

type ChatsState = {
  chatsList: ChatData[];
};

const initialState: ChatsState = {
  chatsList: [
    {
      _id: '0',
      participants: [
        {
          _id: 'user0',
          username: 'John',
          email: 'john@gmail.com',
          role: 'user',
          created: new Date().toISOString(),
          is_online: false,
          profile_image: '/profile-placeholder.jpeg',
        },
        {
          _id: '6611abec2542ae6c079f6e18',
          username: 'Sarah',
          email: 'sarah@gmail.com',
          role: 'user',
          created: new Date().toISOString(),
          is_online: true,
          profile_image: '/profile-placeholder.jpeg',
        },
      ],
      messages: [],
    },
  ],
};

const chatsSlice = createSlice({ name: 'chats', initialState, reducers: {} });

export default chatsSlice;

export const selectChatsList = (state: RootState) => state.chats.chatsList;

export const selectChatById = (id: string) => (state: RootState) =>
  state.chats.chatsList.find((c) => c._id === id);

export const selectParticipantsByChatId = (id: string) => (state: RootState) =>
  state.chats.chatsList.find((c) => c._id === id)?.participants;
