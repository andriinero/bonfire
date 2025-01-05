import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';

import {
  selectContactById,
  selectedContactIdSet,
  useDeleteContactMutation,
} from '../contactsSlice';

import UserIcon from '@/components/general/UserIcon';
import { Button } from '@/components/ui/button';
import { UserRoundMinus } from 'lucide-react';

type ContactsItemProps = { contactId: string };

const ContactsItem = ({ contactId }: ContactsItemProps) => {
  const contact = useAppSelector(selectContactById(contactId))!;
  const [deleteContact] = useDeleteContactMutation();
  const dispatch = useAppDispatch();

  const handleSetSelectedContactId = () => {
    dispatch(selectedContactIdSet(contactId));
  };

  const handleContactDelete = () => {
    deleteContact({
      userId: contactId,
      username: contact.username,
    });
  };

  return (
    <motion.li
      key={contact?.id}
      className="flex items-center gap-4 p-2 hover:cursor-pointer hover:bg-gray-100"
    >
      <UserIcon
        onClick={handleSetSelectedContactId}
        title={contact?.username}
        colorClass={contact?.colorClass}
      />
      <div className="flex-grow">
        <p className="font-semibold">{contact?.username}</p>
        <p className="text-sm text-gray-500">{contact?.email}</p>
      </div>
      <div>
        <Button
          onClick={handleContactDelete}
          size="icon"
          variant="roundedGhost"
        >
          <UserRoundMinus />
        </Button>
      </div>
    </motion.li>
  );
};

export default ContactsItem;
