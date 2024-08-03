import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DrawerPanelType } from './types/DrawerPanel';

type DrawerState = {
  isDrawerOpen: boolean;
  currentDrawerPanelType: DrawerPanelType | null;
  isAddParticipantFormOpen: boolean;
  isDeleteChatRoomFormOpen: boolean;
};

const initialState: DrawerState = {
  isDrawerOpen: false,
  currentDrawerPanelType: null,
  isAddParticipantFormOpen: false,
  isDeleteChatRoomFormOpen: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    drawerPanelTypeSet: (
      state,
      { payload: newPanelType }: PayloadAction<DrawerPanelType>,
    ) => {
      state.currentDrawerPanelType = newPanelType;
    },
    drawerOpened: (state) => {
      state.isDrawerOpen = true;
    },
    drawerClosed: (state) => {
      state.isDrawerOpen = false;
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
  drawerPanelTypeSet,
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
  state.drawer.isDrawerOpen;

export const selectIsAddParticiapntFormOpen = (state: RootState) =>
  state.drawer.isAddParticipantFormOpen;

export const selectIsDeleteChatRoomFormOpen = (state: RootState) =>
  state.drawer.isDeleteChatRoomFormOpen;
