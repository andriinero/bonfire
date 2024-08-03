import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

type ChatState = {
  selectedChatId: string | null;
  isSidebarOpen: boolean;
};

const initialState: ChatState = {
  selectedChatId: null,
  isSidebarOpen: true,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectedChatIdSet: (state, action: PayloadAction<string | null>) => {
      if (state.selectedChatId !== action.payload)
        state.selectedChatId = action.payload;
    },
    selectedChatCleared: (state) => {
      state.selectedChatId = null;
    },
    sidebarOpened: (state) => {
      state.isSidebarOpen = true;
    },
    sidebarClosed: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const {
  selectedChatIdSet,
  selectedChatCleared,
  sidebarOpened,
  sidebarClosed,
} = chatSlice.actions;

export default chatSlice;

export const selectSelectedChatId = (state: RootState) =>
  state.chat.selectedChatId;

export const selectIsSidebarOpen = (state: RootState) =>
  state.chat.isSidebarOpen;
