import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';

import {
  selectContactById,
  selectedContactIdSet,
  selectSelectedContactId,
  useDeleteContactMutation,
} from '../contactsSlice';

import UserIcon from '@/components/general/UserIcon';
import { Button } from '@/components/ui/button';
import { UserRoundMinus } from 'lucide-react';
import cn from '@/utils/cn';

type ContactsItemProps = { contactId: string };

const ContactsItem = ({ contactId }: ContactsItemProps) => {
  const selectedContactId = useAppSelector(selectSelectedContactId);
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

  const isSelectedContact = contactId === selectedContactId;

  return (
    <motion.li
      key={contact?.id}
      className={cn(
        'flex items-center gap-4 rounded-lg p-2 hover:cursor-pointer hover:bg-gray-50',
        { 'bg-gray-100': isSelectedContact },
      )}
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
