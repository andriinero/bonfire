import { useAppSelector } from '@/app/hooks';

import { selectChatById, selectParticipantsByChatId } from '../chatsSlice';
import UserIcon from '@/components/general/UserIcon';
import useNonAuthUserParticipants from '../hooks/useNonAuthUserParticipants';
import ChatTitle from './ChatTitle';

type ChatsItemProps = {
  chatId: string;
};

const ChatsItem = ({ chatId }: ChatsItemProps) => {
  const chatData = useAppSelector(selectChatById(chatId));
  const participants = useAppSelector(selectParticipantsByChatId(chatId));

  const nonAuthUsers = useNonAuthUserParticipants(participants!);

  return (
    <li className="flex gap-4 rounded-md bg-neutral-100 p-2">
      <div>
        {nonAuthUsers.length === 1 ? (
          nonAuthUsers.map((u) => (
            <UserIcon isOnline={u.is_online} src={u.profile_image} style="lg" />
          ))
        ) : (
          <p>TODO: multiple users icon</p>
        )}
      </div>
      <div>
        <h4 className="font-medium text-neutral-800">
          {nonAuthUsers[0].username}
        </h4>
        <ChatTitle />
      </div>
    </li>
  );
};

export default ChatsItem;
