import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DrawerPanelType } from './types/DrawerPanel';

type DrawerState = {
  currentDrawerPanelType: DrawerPanelType | null;
  isAddParticipantFormOpen: boolean;
  isDeleteChatRoomFormOpen: boolean;
};

const initialState: DrawerState = {
  currentDrawerPanelType: null,
  isAddParticipantFormOpen: false,
  isDeleteChatRoomFormOpen: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    drawerOpened: (
      state,
      { payload: newPanelType }: PayloadAction<DrawerPanelType>,
    ) => {
      state.currentDrawerPanelType = newPanelType;
    },
    drawerClosed: (state) => {
      state.currentDrawerPanelType = null;
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
  drawerOpened,
  drawerClosed,
  addParticipantFormOpened,
  addParticipantFormClosed,
  deleteChatRoomFormOpened,
  deleteChatRoomFormClosed,
} = drawerSlice.actions;

export default drawerSlice;

export const selectCurrentDrawerPanelType = (state: RootState) =>
  state.drawer.currentDrawerPanelType;

export const selectIsChatDrawerOpen = (state: RootState) =>
  state.drawer.currentDrawerPanelType !== null;

export const selectIsAddParticiapntFormOpen = (state: RootState) =>
  state.drawer.isAddParticipantFormOpen;

export const selectIsDeleteChatRoomFormOpen = (state: RootState) =>
  state.drawer.isDeleteChatRoomFormOpen;
