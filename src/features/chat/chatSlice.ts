import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

type ChatState = {
  selectedChatId?: string;
};

const initialState: ChatState = {
  selectedChatId: undefined,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectedChatIdSet: (state, action: PayloadAction<string>) => {
      if (state.selectedChatId !== action.payload)
        state.selectedChatId = action.payload;
    },
    selectedChatCleared: (state) => {
      state.selectedChatId = undefined;
    },
  },
});

export const { selectedChatIdSet, selectedChatCleared } = chatSlice.actions;

export default chatSlice;

export const selectSelectedChatId = (state: RootState) =>
  state.chat.selectedChatId;
