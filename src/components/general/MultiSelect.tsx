import type { ChangeEvent } from 'react';

import ContactsItem from '@/features/contacts/components/ContactsItem';
import { X } from 'lucide-react';
import TextInput from '../form/TextInput';
import IconButton from './IconButton';

type MultiSelectProps = {
  onCloseClick?: () => void;
};

let timeout: NodeJS.Timeout;
const REQUEST_DELAY_MS = 500;

const MultiSelect = ({ onCloseClick }: MultiSelectProps) => {
  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      // FIXME: remove comment
      console.log(e.target.value);
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
        <div className="animate-in fade-in slide-in-from-top-2 zoom-in-95 absolute z-10 mt-2 flex w-full flex-col gap-2 rounded-xl bg-white p-3 shadow-md ring-1 ring-gray-300">
          {/* @ts-expect-error this is an example */}
          <ContactsItem />
          {/* @ts-expect-error this is an example */}
          <ContactsItem />
          {/* @ts-expect-error this is an example */}
          <ContactsItem />
        </div>
      </div>
      <IconButton className="p-2" onClick={onCloseClick}>
        <X />
      </IconButton>
    </div>
  );
};

export default MultiSelect;
