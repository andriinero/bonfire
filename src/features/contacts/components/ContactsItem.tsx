import { useAppSelector } from '@/app/hooks';

import { selectContactById, useDeleteContactMutation } from '../contactsSlice';

import UserIcon from '@/components/general/UserIcon';
import { Button } from '@/components/ui/button';
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
    <li key={contact?.id} className="flex items-center gap-4 p-2">
      <UserIcon title={contact?.username} colorClass={contact?.colorClass} />
      <div className="flex-grow">
        <p className="font-semibold">{contact?.username}</p>
        <p className="text-sm text-gray-500">{contact?.email}</p>
        {/* <p className="text-sm font-semibold text-gray-500">{contact.created}</p> */}
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
    </li>
  );
};

export default ContactsItem;
