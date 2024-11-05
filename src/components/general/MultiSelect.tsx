import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

import { contactsApiSlice } from '@/features/contacts/contactsSlice';

import type { User } from '@/types/User';
import type { ChangeEvent } from 'react';

import ContactSearchItem from '@/features/contacts/components/ContactSearchItem';
import { X } from 'lucide-react';
import TextInput from '../form/TextInput';
import Button from './Button';
import IconButton from './IconButton';
import UserIcon from './UserIcon';

type MultiSelectProps = {
  onCloseClick: () => void;
};

const REQUEST_DELAY_MS = 500;

const MultiSelect = ({ onCloseClick }: MultiSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<User[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [
    queryContactsByUsername,
    { data, isSuccess, isFetching },
    lastPromiseInfo,
  ] = contactsApiSlice.useLazyGetContactsByUsernameQuery();

  useEffect(() => {
    queryContactsByUsername('');
  }, [queryContactsByUsername]);

  const handleCloseForm = () => {
    onCloseClick();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const input = e.target.value;
      if (input) queryContactsByUsername(input);
    }, REQUEST_DELAY_MS);
  };

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
            {data?.length !== 0 ? (
              <ul className="mb-auto p-2">
                {data?.map((contact) => {
                  const handleContactAdd = () => {
                    setSelectedItems([...selectedItems, contact]);
                    // FIXME: remove comment
                    console.log(selectedItems);
                  };
                  return (
                    <ContactSearchItem
                      key={contact._id}
                      handleContactAdd={handleContactAdd}
                      {...contact}
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
              {selectedItems.map((item, index) => (
                <div
                  key={item._id}
                  className={cn('relative', `right-[${index * 10}px]`)}
                >
                  <UserIcon
                    colorClass={item.color_class}
                    src={item.profile_image}
                    style="sm"
                    className="ring ring-white"
                  />
                </div>
              ))}
            </ul>
            <Button disabled={isFetching} className="rounded-md">
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
