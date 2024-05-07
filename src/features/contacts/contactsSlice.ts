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
    postContact: builder.mutation<void, { contactUsername: string }>({
      invalidatesTags: ['contacts'],
      query: ({ contactUsername: contactUserame }) => ({
        url: `/profile/contacts/${contactUserame}`,
        method: 'POST',
      }),
    }),
    deleteContact: builder.mutation<void, string>({
      query: (userId: string) => ({
        url: `/profile/contacts/${userId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (userId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          contactsApiSlice.util.updateQueryData(
            'getContacts',
            undefined,
            (draft) => {
              const contactIndex = draft.findIndex((c) => c._id === userId);
              if (contactIndex > -1) {
                draft.splice(contactIndex, 1);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { createContactsModalOpened, createContactsModalClosed } =
  contactsSlice.actions;

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  usePostContactMutation,
} = contactsApiSlice;

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
