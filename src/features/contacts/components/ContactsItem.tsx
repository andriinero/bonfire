import { useAppSelector } from '@/app/hooks';

import { selectContactById, useDeleteContactMutation } from '../contactsSlice';

import type { User } from '@/types/User';

import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import { FaUserMinus } from 'react-icons/fa6';

type ContactsItemProps = { contactId: string };

const ContactsItem = ({ contactId }: ContactsItemProps) => {
  const contact = useAppSelector(selectContactById(contactId, 0)) as User;

  const [deleteContact] = useDeleteContactMutation();

  const handleContactDelete = async (): Promise<void> => {
    try {
      await deleteContact({ userId: contact._id, page: 0 }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg p-2 transition hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <UserIcon
          isOnline={contact?.is_online}
          src={contact?.profile_image}
          style="md"
        />
        <h2 className="text-md font-medium">{contact?.username}</h2>
      </div>
      <IconButton
        aria-label="Delete Contact"
        onClick={handleContactDelete}
        className="bg-transparent"
        style="round"
      >
        <FaUserMinus size="1rem" />
      </IconButton>
    </li>
  );
};

export default ContactsItem;
