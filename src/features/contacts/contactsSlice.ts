import { apiSlice } from '../api/apiSlice';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { User } from '@/types/User';
import { RootState } from '@/app/store';

type ContactsState = {
  isCreateContactModalOpen: boolean;
};

const initialState: ContactsState = {
  isCreateContactModalOpen: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    createContactsModalOpened: (state) => {
      state.isCreateContactModalOpen = true;
    },
    createContactsModalClosed: (state) => {
      state.isCreateContactModalOpen = false;
    },
  },
});

export const contactsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<User[], void>({
      providesTags: ['contacts'],
      query: () => `/profile/contacts`,
    }),
    deleteContact: builder.mutation<void, string>({
      invalidatesTags: ['contacts'],
      query: (userId: string) => ({
        url: `/profile/contacts/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { createContactsModalOpened, createContactsModalClosed } =
  contactsSlice.actions;

export const { useGetContactsQuery, useDeleteContactMutation } =
  contactsApiSlice;

export default contactsSlice;

export const selectIsCreateContactModalOpen = (state: RootState) =>
  state.contacts.isCreateContactModalOpen;

export const selectContactsListResult =
  contactsApiSlice.endpoints.getContacts.select();

export const selectContactsList = createSelector(
  selectContactsListResult,
  (contactsList) => contactsList.data ?? [],
);

export const selectContactById = (contactId: string) =>
  createSelector(selectContactsList, (contactsList) =>
    contactsList.find((c) => c._id === contactId),
  );
