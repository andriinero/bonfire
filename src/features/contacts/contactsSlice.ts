import { apiSlice } from '../api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';

import { User } from '@/types/User';

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

export const { useGetContactsQuery, useDeleteContactMutation } =
  contactsApiSlice;

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
