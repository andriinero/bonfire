import IconButton from '@/components/general/IconButton';
import { FaUserPlus } from 'react-icons/fa6';
import ChatsList from './ChatsList';
import ChatsItem from './ChatsItem';
import { useAppSelector } from '@/app/hooks';
import { selectChatsList } from '../chatsSlice';

const Chats = () => {
  const list = useAppSelector(selectChatsList);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-800">Messages</h1>
        <IconButton style="round">
          <FaUserPlus />
        </IconButton>
      </div>
      <ChatsList>
        {list.map((chat) => (
          <ChatsItem key={chat._id} chatId={chat._id} />
        ))}
      </ChatsList>
    </div>
  );
};

export default Chats;
