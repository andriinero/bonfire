import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import type { RootState } from '@/app/store';
import { PushNotificationType } from '@/types/PushNotification';
import type { User } from '@/types/User';
import { getErrorData } from '@/utils/getErrorData';
import { pushNotificationAdded } from '../pushNotifications/pushNotificationsSlice';

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
    getContacts: builder.query<User[], number>({
      providesTags: ['contacts'],
      query: (page) => `/profile/contacts?page=${page ?? 0}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (curItems, newItems, { arg: page }) => {
        if (page > 0) {
          curItems.push(...newItems);
        } else {
          curItems.length = 0;
          curItems.push(...newItems);
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getContactsByUsername: builder.query<User[], string>({
      query: (username) => `/profile/contacts?page=0&username=${username}`,
    }),
    getContactPageCount: builder.query<number, void>({
      query: () => `/profile/contacts/page-count`,
    }),
    postContact: builder.mutation<void, { contactUsername: string }>({
      invalidatesTags: ['contacts'],
      query: (body) => ({
        url: `/profile/contacts`,
        method: 'POST',
        body,
      }),
      onQueryStarted: async (
        { contactUsername },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled;
          dispatch(
            pushNotificationAdded({
              body: `Contact '${contactUsername}' created`,
              type: PushNotificationType.SUCCESS,
            }),
          );
          dispatch(createContactsModalClosed());
        } catch (err) {
          const errorData = getErrorData((err as { error: unknown }).error);
          dispatch(
            pushNotificationAdded({
              body: `Create contact: "${errorData.message}"`,
              type: PushNotificationType.ERROR,
            }),
          );
        }
      },
    }),
    deleteContact: builder.mutation<void, { userId: string; username: string }>(
      {
        query: ({ userId }) => ({
          url: `/profile/contacts/${userId}`,
          method: 'DELETE',
        }),
        onQueryStarted: async (
          { userId, username },
          { dispatch, queryFulfilled },
        ) => {
          const patchResult = dispatch(
            contactsApiSlice.util.updateQueryData('getContacts', 0, (draft) => {
              const contactIndex = draft.findIndex((c) => c._id === userId);
              if (contactIndex > -1) draft.splice(contactIndex, 1);
            }),
          );
          try {
            await queryFulfilled;
            dispatch(
              pushNotificationAdded({
                body: `Contact '${username}' deleted`,
                type: PushNotificationType.SUCCESS,
              }),
            );
          } catch (err) {
            patchResult.undo();
            const errorData = getErrorData((err as { error: unknown }).error);
            dispatch(
              pushNotificationAdded({
                body: errorData.message,
                type: PushNotificationType.ERROR,
              }),
            );
          }
        },
      },
    ),
  }),
});

export const { createContactsModalOpened, createContactsModalClosed } =
  contactsSlice.actions;

export const {
  useGetContactsQuery,
  useGetContactsByUsernameQuery,
  useGetContactPageCountQuery,
  useDeleteContactMutation,
  usePostContactMutation,
} = contactsApiSlice;

export default contactsSlice;

export const selectIsCreateContactModalOpen = (state: RootState) =>
  state.contacts.isCreateContactModalOpen;

export const selectContactsListResult =
  contactsApiSlice.endpoints.getContacts.select(0);

export const selectContactsList = createSelector(
  selectContactsListResult,
  (contactsList) => contactsList.data ?? [],
);

export const selectContactById = (contactId: string) =>
  createSelector(selectContactsList, (contactsList) =>
    contactsList.find((c) => c._id === contactId),
  );

export const selectContactsListByUsernameResult =
  contactsApiSlice.endpoints.getContactsByUsername.select('');

export const selectContactsListByUsername = createSelector(
  selectContactsListResult,
  (contactsList) => contactsList.data ?? [],
);

export const selectContactByUsernameById = (contactId: string) =>
  createSelector(selectContactsList, (contactsList) =>
    contactsList.find((c) => c._id === contactId),
  );
