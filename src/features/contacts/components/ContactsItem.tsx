import { useAppSelector } from '@/app/hooks';
import UserIcon from '@/components/general/UserIcon';
import { selectContactById } from '../contactsSlice';

type ContactsItemProps = { contactId: string };

const ContactsItem = ({ contactId }: ContactsItemProps) => {
  const contact = useAppSelector(selectContactById(contactId));

  return (
    <li className="flex">
      <UserIcon
        isOnline={contact?.is_online}
        src={contact?.profile_image}
        style="lg"
      />
      <p>{contact?.username}</p>
    </li>
  );
};

export default ContactsItem;
