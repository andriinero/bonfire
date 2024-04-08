import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import { MessageData } from '@/types/MessageData';

import { testMessages } from '@/data/testData';

type MessagesState = {
  messagesList: MessageData[];
};

const initialState: MessagesState = {
  messagesList: [...testMessages],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
});

export default messagesSlice;

export const selectMessagesListByChatId = (id: string) => (state: RootState) =>
  state.messages.messagesList.filter((m) => m.chat_room === id);

export const selectMessageById = (id: string) => (state: RootState) =>
  state.messages.messagesList.find((m) => m._id === id);
