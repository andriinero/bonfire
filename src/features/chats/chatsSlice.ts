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
          username: 'John',
          email: 'john@gmail.com',
          role: 'user',
          created: '',
          is_online: true,
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
