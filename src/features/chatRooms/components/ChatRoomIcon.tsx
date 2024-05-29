import { useAppSelector } from '@/app/hooks';
import useNonAuthParticipants from '../hooks/useNonAuthParticipants';

import { selectChatRoomById } from '../chatRoomsSlice';

import UserIcon from '@/components/general/UserIcon';
import FallbackIcon from '@/components/general/FallbackIcon';

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
      <FallbackIcon
        title={chatRoom?.name}
        colorClass={chatRoom?.color_class}
        className={className}
      />
    ) : nonAuthParticipants[0].profile_image ? (
      <UserIcon
        src={nonAuthParticipants[0].profile_image}
        isOnline={nonAuthParticipants[0].is_online}
        style={style}
      />
    ) : (
      <FallbackIcon
        title={nonAuthParticipants[0].username}
        colorClass={chatRoom?.color_class}
      />
    )
  ) : (
    <UserIcon />
  );
};

export default ChatRoomIcon;
