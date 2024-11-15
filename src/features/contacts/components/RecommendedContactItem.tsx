import { useAppSelector } from '@/app/hooks';

import {
  selectRecommendedContactById,
  usePostContactMutation,
} from '../contactsSlice';

import UserIcon from '@/components/general/UserIcon';

type RecommendedContactItemProps = { contactId: string };

const RecommendedContactItem = ({ contactId }: RecommendedContactItemProps) => {
  const contact = useAppSelector(selectRecommendedContactById(contactId));

  const [postContact] = usePostContactMutation();

  const handleContactClick = async (): Promise<void> => {
    if (contact) postContact({ contactUsername: contact.username });
  };

  return (
    <li
      onClick={handleContactClick}
      className="flex cursor-pointer flex-col items-center gap-1"
    >
      <UserIcon
        title={contact?.username}
        colorClass={contact?.colorClass}
        src={contact?.profileImage}
      />
      <p className="text-sm font-medium">{contact?.username}</p>
    </li>
  );
};

export default RecommendedContactItem;
