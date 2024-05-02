import { User } from '@/types/User';
import { apiSlice } from '../api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';

export const contactsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<User[], void>({
      query: () => `/profile/contacts`,
    }),
  }),
});

export const { useGetContactsQuery } = contactsApiSlice;

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
