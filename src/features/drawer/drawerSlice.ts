import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

type DrawerState = {
  isChatDrawerOpen: boolean;
  isAddParticipantFormOpen: boolean;
  isDeleteChatRoomFormOpen: boolean;
};

const initialState: DrawerState = {
  isChatDrawerOpen: false,
  isAddParticipantFormOpen: false,
  isDeleteChatRoomFormOpen: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    chatDrawerOpened: (state) => {
      state.isChatDrawerOpen = true;
    },
    chatDrawerClosed: (state) => {
      state.isChatDrawerOpen = false;
    },
    addParticipantFormOpened: (state) => {
      state.isAddParticipantFormOpen = true;
    },
    addParticipantFormClosed: (state) => {
      state.isAddParticipantFormOpen = false;
    },
    deleteChatRoomFormOpened: (state) => {
      state.isDeleteChatRoomFormOpen = true;
    },
    deleteChatRoomFormClosed: (state) => {
      state.isDeleteChatRoomFormOpen = false;
    },
  },
});

export const {
  chatDrawerOpened,
  chatDrawerClosed,
  addParticipantFormOpened,
  addParticipantFormClosed,
  deleteChatRoomFormOpened,
  deleteChatRoomFormClosed,
} = drawerSlice.actions;

export default drawerSlice;

export const selectIsChatDrawerOpen = (state: RootState) =>
  state.drawer.isChatDrawerOpen;

export const selectIsAddParticiapntFormOpen = (state: RootState) =>
  state.drawer.isAddParticipantFormOpen;

export const selectIsDeleteChatRoomFormOpen = (state: RootState) =>
  state.drawer.isDeleteChatRoomFormOpen;
