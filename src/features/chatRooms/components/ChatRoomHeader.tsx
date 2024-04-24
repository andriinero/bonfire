import IconButton from '@/components/general/IconButton';
import { FaUserPlus } from 'react-icons/fa6';

const ChatRoomHeader = () => {
  return (
    <div className="flex items-center justify-between gap-16">
      <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
      <IconButton style="round">
        <FaUserPlus />
      </IconButton>
    </div>
  );
};

export default ChatRoomHeader;
