import { useAppSelector } from '@/app/hooks';

import cn from '@/utils/cn';

import { selectAuthUserId } from '@/features/auth/authSlice';

import type { Message } from '@/types/Message';

import DotDivider from '@/components/general/DotDivider';
import TimeStamp from '@/components/general/TimeStamp';
import UserAvatar from '@/components/general/UserAvatar';

type UserMessageProps = Pick<Message, 'user' | 'body' | 'created'>;

const UserMessage = ({ user, body, created }: UserMessageProps) => {
  const authUserId = useAppSelector(selectAuthUserId);

  const isAuthUserMessage = authUserId === user.id;

  return (
    <li
      aria-label="chat-message"
      className={cn('flex gap-2', { 'flex-row-reverse': isAuthUserMessage })}
    >
      <div>
        <UserAvatar
          title={user.username}
          colorClass={user.colorClass}
          src={user.profileImage}
          isOnline={user.isOnline}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={cn('flex items-center gap-1 text-sm', {
            'justify-end': isAuthUserMessage,
          })}
        >
          {!isAuthUserMessage && (
            <>
              <p className="font-medium text-gray-500">{user.username}</p>
              <DotDivider />
            </>
          )}
          <TimeStamp date={created} className="text-xs text-gray-500" />
        </div>
        <p
          className={cn(
            'max-w-[30ch] self-start rounded-2xl bg-gray-100 px-3 py-2 text-start text-sm font-medium text-gray-950',
            {
              'self-end bg-amber-500 text-white': isAuthUserMessage,
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
