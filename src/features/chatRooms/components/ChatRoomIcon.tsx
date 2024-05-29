import { useAppSelector } from '@/app/hooks';
import useNonAuthParticipants from '../hooks/useNonAuthParticipants';

import cn from '@/utils/cn';

import { selectChatRoomById } from '../chatRoomsSlice';

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
  const chatRoom = useAppSelector(selectChatRoomById(chatRoomId));
  const nonAuthParticipants = useNonAuthParticipants(chatRoomId);

  return nonAuthParticipants ? (
    nonAuthParticipants.length > 1 ? (
      <div
        className={cn(
          'flex size-10 items-center justify-center rounded-full text-2xl font-semibold text-sky-50',
          'bg-' + chatRoom?.fallback_color_class,
          className,
          {
            'size-6': style === 'xs',
            'size-10': style === 'md',
            'size-12': style === 'lg',
          },
        )}
      >
        {chatRoom?.name?.substring(0, 1).toUpperCase()}
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
