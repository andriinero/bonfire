import { useAppSelector } from '@/app/hooks';
import { selectRecommendedContactById } from '../contactsSlice';
import UserIcon from '@/components/general/UserIcon';

type RecommendedContactItemProps = { contactId: string };

const RecommendedContactItem = ({ contactId }: RecommendedContactItemProps) => {
  const contact = useAppSelector(selectRecommendedContactById(contactId));

  return (
    <li className="flex flex-col items-center gap-1">
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
