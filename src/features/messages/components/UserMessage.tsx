import cn from '@/utils/cn';
import { MessageData } from '@/types/MessageData';
import UserIcon from '@/components/general/UserIcon';
import TimeStamp from '@/components/general/TimeStamp';
import { useAppSelector } from '@/app/hooks';
import { selectAuthUserId } from '@/features/auth/authSlice';
import { selectSelectedChatId } from '@/features/chat/chatSlice';
import { selectUserById } from '@/features/users/usersSlice';
import { UserData } from '@/types/UserData';

type UserMessageProps = {} & MessageData;

const UserMessage = ({
  _id,
  chat_room,
  user,
  body,
  created,
  reply,
}: UserMessageProps) => {
  const selectedChatId = useAppSelector(selectSelectedChatId);
  const authUserId = useAppSelector(selectAuthUserId);
  const userData = useAppSelector(
    selectUserById(selectedChatId!, user!),
  ) as UserData;

  const isAuthor = authUserId === userData._id;

  return (
    <li className={cn('flex gap-2', { 'flex-row-reverse': isAuthor })}>
      <div>
        <UserIcon src={userData.profile_image} isOnline={userData.is_online} />
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={cn('flex items-center gap-2', { 'justify-end': isAuthor })}
        >
          <p className="text-sm font-medium text-gray-500">
            {userData.username}
          </p>
          <TimeStamp date={created} className="text-xs" />
        </div>
        <p
          className={cn(
            'rounded-full bg-gray-100 p-2 text-center text-sm font-medium text-gray-800',
            {
              'bg-sky-500 text-white': isAuthor,
            },
          )}
        >
          {body}
        </p>
      </div>
    </li>
  );
};

export default UserMessage;
