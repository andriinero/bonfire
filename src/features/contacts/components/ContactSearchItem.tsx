import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectContactByUsernameById } from '../contactsSlice';

import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import {
  selectedContactAdded,
  selectedContactRemoved,
} from '@/features/chatRooms/chatRoomsSlice';
import { Check, Plus } from 'lucide-react';

type ContactSearchProps = { contactId: string; isSelected: boolean };

const ContactSearchItem = ({ contactId, isSelected }: ContactSearchProps) => {
  const contact = useAppSelector(selectContactByUsernameById(contactId))!;

  const dispatch = useAppDispatch();

  const handleContactClick = () => {
    if (isSelected) dispatch(selectedContactRemoved(contact.id));
    else dispatch(selectedContactAdded(contact));
  };

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg p-2 transition hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <UserIcon
          title={contact?.username}
          colorClass={contact?.colorClass}
          isOnline={contact?.isOnline}
          src={contact?.profileImage}
          style="sm"
        />
        <p className="text-sm font-medium">{contact?.username}</p>
      </div>
      <IconButton
        aria-label="Add Contact"
        className="bg-transparent"
        style="round"
        onClick={handleContactClick}
      >
        {isSelected ? <Check /> : <Plus />}
      </IconButton>
    </li>
  );
};

export default ContactSearchItem;
