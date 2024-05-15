import useNonAuthParticipants from '../hooks/useNonAuthParticipants';

import cn from '@/utils/cn';

import UserIcon from '@/components/general/UserIcon';

type ChatRoomIconProps = {
  chatRoomId: string;
  style?: 'xs' | 'md' | 'lg';
  className?: string;
};

const ChatRoomIcon = ({
  chatRoomId,
  style = 'md',
  className,
}: ChatRoomIconProps) => {
  const nonAuthParticipants = useNonAuthParticipants(chatRoomId);
  const totalParticipantsCount = (nonAuthParticipants?.length ?? 0) + 1;

  return nonAuthParticipants ? (
    nonAuthParticipants.length > 1 ? (
      <div
        className={cn(
          'flex size-10 items-center justify-center rounded-full bg-sky-500 text-xl font-extrabold text-sky-50',
          className,
          {
            'size-6': style === 'xs',
            'size-10': style === 'md',
            'size-12': style === 'lg',
          },
          {
            'text-sm': totalParticipantsCount >= 100,
          },
        )}
      >
        {totalParticipantsCount}
      </div>
    ) : (
      <UserIcon
        src={nonAuthParticipants[0].profile_image}
        isOnline={nonAuthParticipants[0].is_online}
        style={style}
      />
    )
  ) : (
    <UserIcon />
  );
};

export default ChatRoomIcon;
