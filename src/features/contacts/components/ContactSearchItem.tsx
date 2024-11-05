import { useAppSelector } from '@/app/hooks';

import { selectContactByUsernameById } from '../contactsSlice';

import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import { Plus } from 'lucide-react';

type ContactSearchProps = { contactId: string };

const ContactSearchItem = ({ contactId }: ContactSearchProps) => {
  const contact = useAppSelector(selectContactByUsernameById(contactId));

  const handleContactClick = () => {};

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg p-2 transition hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <UserIcon
          title={contact?.username}
          colorClass={contact?.color_class}
          isOnline={contact?.is_online}
          src={contact?.profile_image}
        />
        <h2 className="font-medium">{contact?.username}</h2>
      </div>
      <IconButton
        aria-label="Add Contact"
        onClick={handleContactClick}
        className="bg-transparent"
        style="round"
      >
        <Plus />
      </IconButton>
    </li>
  );
};

export default ContactSearchItem;
