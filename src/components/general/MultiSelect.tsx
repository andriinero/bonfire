import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useEscapeListener from '@/hooks/useEscapeListener';
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
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
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

  const handleFormClose = () => {
    dispatch(createChatRoomClosed());
    dispatch(selectedContactsReset());
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEscapeListener(handleFormClose);

  const handleContactQuery = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const input = e.target.value;
      queryContactsByUsername(input);
    }, REQUEST_DELAY_MS);
  };

  const handleFormSubmit = () => {
    const selectedContactIds = selectedContacts.map((contact) => contact.id);
    postChatRoom({ userIds: selectedContactIds });
  };

  const isSubmitDisabled = isContactsFetching || isPostChatRoomLoading;

  return (
    <div className="flex w-full gap-1">
      <div className="relative flex-1 space-y-2">
        <Input
          onChange={handleContactQuery}
          placeholder="Enter the contact name"
          className="rounded-lg"
        />
        <Card className="absolute z-10 flex w-full flex-col animate-in fade-in zoom-in-95 slide-in-from-top-2">
          <CardHeader className="space-y-1 border-b p-3">
            <CardTitle className="text-base">New chat room</CardTitle>
            <CardDescription>
              Invite several people to your new chat.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center p-2">
            {contacts?.length !== 0 ? (
              <ul className="flex flex-col gap-1">
                {contacts?.map((contact) => {
                  const isSelected = selectedContacts.some(
                    (selectedContact) => selectedContact.id === contact.id,
                  );
                  return (
                    <ContactSearchItem
                      key={contact.id}
                      contactId={contact.id}
                      isSelected={isSelected}
                    />
                  );
                })}
              </ul>
            ) : (
              <h1 className="my-4 text-center text-sm text-gray-700">
                Your contact list is empty :(
              </h1>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-3">
            <ul className="flex">
              {selectedContacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className={cn('relative', `right-[${index * 20}px]`)}
                >
                  <UserIcon
                    title={contact.username}
                    colorClass={contact.colorClass}
                    src={contact.profileImage}
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
          </CardFooter>
        </Card>
      </div>
      <Button
        className="p-2"
        onClick={handleFormClose}
        variant="ghost"
        size="icon"
      >
        <X />
      </Button>
    </div>
  );
};

export default MultiSelect;
