import { createSlice } from '@reduxjs/toolkit';

import { testParticipant } from '@/data/testData';

import { ChatData } from '@/types/ChatData';
import { RootState } from '@/app/store';

type ChatsState = {
  chatsList: ChatData[];
};

const initialState: ChatsState = {
  chatsList: [
    {
      _id: 'johnchat01',
      participants: [testParticipant],
      created: new Date().toString(),
    },
  ],
};

const chatsSlice = createSlice({ name: 'chats', initialState, reducers: {} });

export default chatsSlice;

export const selectChatsList = (state: RootState) => state.chats.chatsList;

export const selectChatById = (id: string) => (state: RootState) =>
  state.chats.chatsList.find((c) => c._id === id);

export const selectParticipantsListByChatId =
  (id: string) => (state: RootState) =>
    state.chats.chatsList.find((c) => c._id === id)?.participants ?? [];
