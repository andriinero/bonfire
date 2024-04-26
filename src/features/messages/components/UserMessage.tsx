import { useAppSelector } from '@/app/hooks';

import cn from '@/utils/cn';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { selectSelectedChatId } from '@/features/chat/chatSlice';
import { selectParticipantById } from '@/features/participants/participantsSlice';

import { MessageData } from '@/types/MessageData';
import { UserData } from '@/types/UserData';

import UserIcon from '@/components/general/UserIcon';
import TimeStamp from '@/components/general/TimeStamp';

type UserMessageProps = Pick<MessageData, 'user' | 'body' | 'created'>;

const UserMessage = ({ user, body, created }: UserMessageProps) => {
  const selectedChatId = useAppSelector(selectSelectedChatId);
  const authUserId = useAppSelector(selectAuthUserId);
  const participantData = useAppSelector(
    selectParticipantById(selectedChatId!, user!),
  ) as UserData;

  const isAuthor = authUserId === participantData._id;

  return (
    <li className={cn('flex gap-2', { 'flex-row-reverse': isAuthor })}>
      <div>
        <UserIcon
          src={participantData.profile_image}
          isOnline={participantData.is_online}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={cn('flex items-center gap-2', { 'justify-end': isAuthor })}
        >
          <p className="text-sm font-medium text-gray-500">
            {participantData.username}
          </p>
          <TimeStamp date={created} className="text-xs" />
        </div>
        <p
          className={cn(
            'max-w-[30ch] self-start  rounded-full bg-gray-100 px-3 py-2 text-start text-sm font-medium text-gray-800',
            {
              'self-end bg-sky-500 text-white': isAuthor,
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
