import { useAppSelector } from '@/app/hooks';

import { selectContactById, useDeleteContactMutation } from '../contactsSlice';

import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import { UserRoundMinus } from 'lucide-react';

type ContactsItemProps = { contactId: string };

const ContactsItem = ({ contactId }: ContactsItemProps) => {
  const contact = useAppSelector(selectContactById(contactId))!;

  const [deleteContact] = useDeleteContactMutation();

  const handleContactDelete = () => {
    deleteContact({
      userId: contactId,
      username: contact.username,
    });
  };

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg p-2 transition hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <UserIcon
          title={contact?.username}
          colorClass={contact?.colorClass}
          isOnline={contact?.isOnline}
          src={contact?.profileImage}
          style="md"
        />
        <h2>{contact?.username}</h2>
      </div>
      <IconButton
        aria-label="Delete Contact"
        onClick={handleContactDelete}
        className="bg-transparent"
        style="round"
      >
        <UserRoundMinus />
      </IconButton>
    </li>
  );
};

export default ContactsItem;
