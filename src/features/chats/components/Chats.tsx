import { FaUserPlus } from 'react-icons/fa6';
import IconButton from '@/components/general/IconButton';
import ChatsList from './ChatsList';

const Chats = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">Messages</h1>
        <IconButton style="round">
          <FaUserPlus />
        </IconButton>
      </div>
      <div>
        <ChatsList />
      </div>
    </div>
  );
};

export default Chats;
