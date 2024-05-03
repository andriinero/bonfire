import { useAppSelector } from '@/app/hooks';

import { selectContactById } from '../contactsSlice';

import UserIcon from '@/components/general/UserIcon';

type ContactsItemProps = { contactId: string };

const ContactsItem = ({ contactId }: ContactsItemProps) => {
  const contact = useAppSelector(selectContactById(contactId));

  return (
    <li className="flex items-center gap-4 rounded-lg p-2 transition hover:bg-gray-50">
      <UserIcon
        isOnline={contact?.is_online}
        src={contact?.profile_image}
        style="lg"
      />
      <p className="text-lg font-medium">{contact?.username}</p>
    </li>
  );
};

export default ContactsItem;
