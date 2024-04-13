import { useAppSelector } from '@/app/hooks';
import useNonAuthUserParticipants from '../hooks/useNonAuthUserParticipants';

import { selectMessagesListByChatId } from '@/features/messages/messagesSlice';
import { selectParticipantsListByChatId } from '../chatsSlice';

import UserIcon from '@/components/general/UserIcon';
import TimeStamp from '@/components/general/TimeStamp';
import ChatTitle from '../../../components/general/ChatTitle';
import MessagePreview from './MessagePreview';

type ChatsItemProps = {
  chatId: string;
};

const ChatsItem = ({ chatId }: ChatsItemProps) => {
  const participants = useAppSelector(selectParticipantsListByChatId(chatId));
  const lastMessage = useAppSelector(selectMessagesListByChatId(chatId))[0];

  const nonAuthUsers = useNonAuthUserParticipants(participants!);

  return (
    <li className="flex cursor-pointer gap-4 rounded-md bg-gray-100 p-2">
      <div>
        {nonAuthUsers.length === 1 ? (
          nonAuthUsers.map((u) => (
            <UserIcon
              key={u._id}
              isOnline={u.is_online}
              src={u.profile_image}
              style="lg"
            />
          ))
        ) : (
          <p>TODO: multiple users icon</p>
        )}
      </div>
      <div className="flex grow justify-between gap-2">
        <div className="flex flex-col justify-between">
          <ChatTitle participants={nonAuthUsers!} />
          {lastMessage && <MessagePreview messageId={lastMessage._id} />}
        </div>
        <div>
          <TimeStamp date={lastMessage.created} />
        </div>
      </div>
    </li>
  );
};

export default ChatsItem;
