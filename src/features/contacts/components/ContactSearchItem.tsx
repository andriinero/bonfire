import IconButton from '@/components/general/IconButton';
import UserIcon from '@/components/general/UserIcon';
import { Plus } from 'lucide-react';

type ContactSearchProps = {
  username: string;
  color_class: string;
  is_online: boolean;
  profile_image: string;
  handleContactAdd: () => void;
};

const ContactSearchItem = ({
  username,
  color_class,
  is_online,
  profile_image,
  handleContactAdd,
}: ContactSearchProps) => {
  return (
    <li className="flex items-center justify-between gap-4 rounded-lg p-2 transition hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <UserIcon
          title={username}
          colorClass={color_class}
          isOnline={is_online}
          src={profile_image}
        />
        <h2 className="font-medium">{username}</h2>
      </div>
      <IconButton
        aria-label="Add Contact"
        onClick={handleContactAdd}
        className="bg-transparent"
        style="round"
      >
        <Plus />
      </IconButton>
    </li>
  );
};

export default ContactSearchItem;
