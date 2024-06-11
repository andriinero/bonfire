import { useAppSelector } from '@/app/hooks';
import useNonAuthParticipants from '../hooks/useNonAuthParticipants';

import { selectChatRoomById } from '../chatRoomsSlice';

import FallbackIcon from '@/components/general/FallbackIcon';
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
  const firstParticipant = nonAuthParticipants?.[0];

  return nonAuthParticipants ? (
    nonAuthParticipants.length > 1 ? (
      <FallbackIcon
        title={chatRoom?.name}
        colorClass={chatRoom?.color_class}
        className={className}
      />
    ) : (
      <UserIcon
        className={className}
        title={firstParticipant?.username}
        colorClass={firstParticipant?.color_class}
        src={firstParticipant?.profile_image}
        isOnline={firstParticipant?.is_online}
        style={style}
      />
    )
  ) : (
    <UserIcon />
  );
};

export default ChatRoomIcon;
