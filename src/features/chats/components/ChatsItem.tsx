import useNonAuthUserIds from '../../../hooks/useNonAuthUserParticipants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectChatById } from '../chatsSlice';
import { selectedChatIdSet } from '@/features/chat/chatSlice';

import UserIcon from '@/components/general/UserIcon';
import TimeStamp from '@/components/general/TimeStamp';
import MessagePreview from './MessagePreview';
import { useGetMessagesQuery } from '@/features/messages/messagesSlice';
import { selectUserById, useGetUsersQuery } from '@/features/users/usersSlice';
import ChatTitle from '@/components/general/ChatTitle';

type ChatsItemProps = {
  chatId: string;
};

const ChatsItem = ({ chatId }: ChatsItemProps) => {
  const chatById = useAppSelector(selectChatById(chatId));
  const lastMessage = chatById?.messages[0];
  const nonAuthUsers = useNonAuthUserIds(chatById?.participants);
  const user = useAppSelector(selectUserById(chatId, nonAuthUsers[0]));

  // TODO: move to query?
  useGetMessagesQuery(chatId);
  useGetUsersQuery(chatId);

  const dispatch = useAppDispatch();

  const handleChatClick = (): void => {
    dispatch(selectedChatIdSet(chatId));
  };

  return (
    <li
      className="flex cursor-pointer gap-4 rounded-lg bg-gray-100 p-2"
      onClick={handleChatClick}
    >
      <div>
        {user && (
          <UserIcon
            key={user._id}
            isOnline={user.is_online}
            src={user.profile_image}
            style="lg"
          />
        )}
      </div>
      <div className="flex grow justify-between gap-2">
        <div className="flex flex-col justify-between">
          {chatById && <ChatTitle title={chatById.name} />}
          {lastMessage && <MessagePreview messageId={lastMessage._id} />}
        </div>
        <div>{lastMessage && <TimeStamp date={lastMessage.created} />}</div>
      </div>
    </li>
  );
};

export default ChatsItem;
