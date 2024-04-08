import { useAppSelector } from '@/app/hooks';
import useNonAuthUserParticipants from '../hooks/useNonAuthUserParticipants';

import { selectMessagesListByChatId } from '@/features/messages/messagesSlice';
import { selectParticipantsListByChatId } from '../chatsSlice';

import UserIcon from '@/components/general/UserIcon';
import ChatTitle from './ChatTitle';
import MessagePreview from './MessagePreview';

type ChatsItemProps = {
  chatId: string;
};

const ChatsItem = ({ chatId }: ChatsItemProps) => {
  const participants = useAppSelector(selectParticipantsListByChatId(chatId));
  const lastMessage = useAppSelector(selectMessagesListByChatId(chatId))[0];

  const nonAuthUsers = useNonAuthUserParticipants(participants!);

  return (
    <li className="flex gap-4 rounded-md bg-neutral-100 p-2">
      <div>
        {nonAuthUsers.length === 1 ? (
          nonAuthUsers.map((u) => (
            <UserIcon
              key="0"
              isOnline={u.is_online}
              src={u.profile_image}
              style="lg"
            />
          ))
        ) : (
          <p>TODO: multiple users icon</p>
        )}
      </div>
      <div>
        <ChatTitle participants={nonAuthUsers!} />
        {lastMessage && <MessagePreview messageId={lastMessage._id} />}
      </div>
    </li>
  );
};

export default ChatsItem;
