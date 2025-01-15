import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';

import {
  openContactProfileIdSet,
  selectContactById,
  selectSelectedContactId,
  useDeleteContactMutation,
} from '../contactsSlice';

import UserAvatar from '@/components/general/UserAvatar';
import { Button } from '@/components/ui/button';
import cn from '@/utils/cn';
import { UserRoundMinus } from 'lucide-react';

type ContactsItemProps = { contactId: string };

const ContactsItem = ({ contactId }: ContactsItemProps) => {
  const selectedContactId = useAppSelector(selectSelectedContactId);
  const contact = useAppSelector(selectContactById(contactId))!;
  const [deleteContact] = useDeleteContactMutation();
  const dispatch = useAppDispatch();

  const handleSetSelectedContactId = () => {
    dispatch(openContactProfileIdSet(contactId));
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
        'flex items-center justify-between gap-4 rounded-lg p-2 hover:bg-gray-50',
        { 'bg-gray-100': isSelectedContact },
      )}
    >
      <div
        onClick={handleSetSelectedContactId}
        className="flex items-center justify-center gap-3 hover:cursor-pointer "
      >
        <UserAvatar
          title={contact?.username}
          colorClass={contact?.colorClass}
        />
        <div className="flex-grow">
          <p className="font-semibold">{contact?.username}</p>
          <p className="text-sm text-gray-500">{contact?.email}</p>
        </div>
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
