import UserIcon from '@/components/general/UserIcon';

const RecommendedContacts = () => {
  return (
    <div className="border-b border-t p-4">
      <ul className="flex gap-4">
        <li>
          <UserIcon />
        </li>
        <li>
          <UserIcon />
        </li>
        <li>
          <UserIcon />
        </li>
      </ul>
    </div>
  );
};

export default RecommendedContacts;
