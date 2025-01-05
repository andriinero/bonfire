import { useAppSelector } from '@/app/hooks';
import useNonAuthParticipants from '../hooks/useNonAuthParticipants';

import { selectChatRoomById } from '../chatRoomsSlice';

import FallbackIcon from '@/components/general/FallbackIcon';
import UserAvatar from '@/components/general/UserAvatar';

type ChatRoomIconProps = {
  chatRoomId: string;
  style?: 'xs' | 'md' | 'lg' | 'xl';
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

  const chatRoomTitle = chatRoom?.name || firstParticipant?.username;

  return nonAuthParticipants ? (
    nonAuthParticipants.length > 1 ? (
      <FallbackIcon
        title={chatRoomTitle}
        colorClass={chatRoom?.colorClass}
        className={className}
        style={style}
      />
    ) : (
      <UserAvatar
        className={className}
        title={firstParticipant?.username}
        colorClass={firstParticipant?.colorClass}
        src={firstParticipant?.profileImage}
        isOnline={firstParticipant?.isOnline}
        style={style}
      />
    )
  ) : (
    <UserAvatar />
  );
};

export default ChatRoomIcon;
