import { useAppSelector } from '@/app/hooks';

import cn from '@/utils/cn';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { selectSelectedChatId } from '@/features/chat/chatSlice';
import { selectParticipantById } from '@/features/participants/participantsSlice';

import type { Message } from '@/types/Message';

import DotDivider from '@/components/general/DotDivider';
import TimeStamp from '@/components/general/TimeStamp';
import UserIcon from '@/components/general/UserIcon';

type UserMessageProps = Pick<Message, 'user' | 'body' | 'created'>;

const UserMessage = ({ userId: user, body, created }: UserMessageProps) => {
  const selectedChatId = useAppSelector(selectSelectedChatId);
  const authUserId = useAppSelector(selectAuthUserId);

  const participantData = useAppSelector(
    selectParticipantById(selectedChatId!, user!),
  );

  const isAuthor = authUserId === participantData?.id;

  return (
    <li
      aria-label="chat-message"
      className={cn('flex gap-2', { 'flex-row-reverse': isAuthor })}
    >
      <div>
        <UserIcon
          title={participantData?.username}
          colorClass={participantData?.colorClass}
          src={participantData?.profileImage}
          isOnline={participantData?.isOnline}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={cn('flex items-center gap-1 text-sm', {
            'justify-end': isAuthor,
          })}
        >
          <p className="font-medium text-gray-500">
            {participantData?.username}
          </p>
          <DotDivider />
          <TimeStamp date={created} className="text-xs text-gray-500" />
        </div>
        <p
          className={cn(
            'max-w-[30ch] self-start rounded-2xl bg-gray-100 px-3 py-2 text-start text-sm font-medium text-gray-900',
            {
              'self-end bg-amber-500 text-white': isAuthor,
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
