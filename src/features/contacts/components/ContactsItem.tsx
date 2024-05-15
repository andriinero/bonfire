import { useAppSelector } from '@/app/hooks';

import { selectContactById, useDeleteContactMutation } from '../contactsSlice';

import type { ErrorData } from '@/types/ErrorData';
import type { User } from '@/types/User';

import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import { FaUserMinus } from 'react-icons/fa6';

type ContactsItemProps = { contactId: string };

const ContactsItem = ({ contactId }: ContactsItemProps) => {
  const contact = useAppSelector(selectContactById(contactId)) as User;

  const [deleteContact] = useDeleteContactMutation();

  const handleContactDelete = async (): Promise<void> => {
    try {
      await deleteContact(contact._id).unwrap();
    } catch (err) {
      console.error((err as ErrorData).message);
    }
  };

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg p-2 transition">
      <div className="flex items-center gap-4">
        <UserIcon
          isOnline={contact?.is_online}
          src={contact?.profile_image}
          style="lg"
        />
        <p className="text-lg font-medium">{contact?.username}</p>
      </div>
      <IconButton
        aria-label="Delete Contact"
        onClick={handleContactDelete}
        style="round"
      >
        <FaUserMinus />
      </IconButton>
    </li>
  );
};

export default ContactsItem;
