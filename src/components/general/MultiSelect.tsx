import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

import {
  createChatRoomClosed,
  selectedContactsReset,
  selectSelectedContacts,
  usePostChatRoomMutation,
} from '@/features/chatRooms/chatRoomsSlice';
import { contactsApiSlice } from '@/features/contacts/contactsSlice';

import type { ChangeEvent } from 'react';

import ContactSearchItem from '@/features/contacts/components/ContactSearchItem';
import { X } from 'lucide-react';
import TextInput from '../form/TextInput';
import Button from './Button';
import IconButton from './IconButton';
import UserIcon from './UserIcon';

const REQUEST_DELAY_MS = 500;

const MultiSelect = () => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const selectedContacts = useAppSelector(selectSelectedContacts);
  const [
    queryContactsByUsername,
    { data: contacts, isFetching: isContactsFetching },
  ] = contactsApiSlice.useLazyGetContactsByUsernameQuery();
  const [postChatRoom, { isLoading: isPostChatRoomLoading }] =
    usePostChatRoomMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    queryContactsByUsername('');
  }, [dispatch, queryContactsByUsername]);

  const handleCloseForm = () => {
    dispatch(createChatRoomClosed());
    dispatch(selectedContactsReset());
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleFormSubmit = () => {
    const selectedContactIds = selectedContacts.map((contact) => contact._id);
    postChatRoom({ userIds: selectedContactIds });
  };

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const input = e.target.value;
      if (input) queryContactsByUsername(input);
    }, REQUEST_DELAY_MS);
  };

  const isSubmitDisabled = isContactsFetching || isPostChatRoomLoading;

  return (
    <div className="flex w-full gap-1">
      <div className="relative flex-1">
        <TextInput
          onChange={handleTextInputChange}
          placeholder="Enter the contact name"
          className="rounded-xl"
        />
        <div className="animate-in fade-in slide-in-from-top-2 zoom-in-95 absolute z-10 mt-2 flex w-full flex-col gap-2 rounded-xl bg-white shadow-md ring-1 ring-gray-300">
          <div className="border-b border-gray-200 p-3">
            <h2 className="font-bold">New chat room</h2>
            <p className="text-sm text-gray-700">
              Invite several contacts to your new chat.
            </p>
          </div>
          <div className="flex basis-64 flex-col justify-center">
            {contacts?.length !== 0 ? (
              <ul className="mb-auto p-2">
                {contacts?.map((contact) => {
                  const isSelected = selectedContacts.some(
                    (selectedContact) => selectedContact._id === contact._id,
                  );
                  return (
                    <ContactSearchItem
                      key={contact._id}
                      contactId={contact._id}
                      isSelected={isSelected}
                    />
                  );
                })}
              </ul>
            ) : (
              <h1 className="text-center text-sm">
                The search has returned no results
              </h1>
            )}
          </div>
          <div className="flex justify-between border-t border-gray-200 p-4">
            <ul className="flex">
              {selectedContacts.map((contact, index) => (
                <div
                  key={contact._id}
                  className={cn('relative', `right-[${index * 20}px]`)}
                >
                  <UserIcon
                    title={contact.username}
                    colorClass={contact.color_class}
                    src={contact.profile_image}
                    style="sm"
                    className="ring ring-white"
                  />
                </div>
              ))}
            </ul>
            <Button
              onClick={handleFormSubmit}
              disabled={isSubmitDisabled}
              className="rounded-md"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
      <IconButton className="p-2" onClick={handleCloseForm}>
        <X />
      </IconButton>
    </div>
  );
};

export default MultiSelect;
