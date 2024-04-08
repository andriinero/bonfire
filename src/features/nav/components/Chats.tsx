import IconButton from '@/components/general/IconButton';
import { FaUserPlus } from 'react-icons/fa6';

const Chats = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Messages</h1>
        <IconButton style='round'>
          <FaUserPlus />
        </IconButton>
      </div>
    </div>
  );
};

export default Chats;
