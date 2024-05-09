import cn from '@/utils/cn';

import type { User } from '@/types/User';

type ChatOnlineStatusProps = {
  nonAuthParticipants: User[];
  className?: string;
};

const ChatOnlineStatus = ({
  nonAuthParticipants,
  className,
}: ChatOnlineStatusProps) => {
  let onlineStatus = '';

  const participantCount = nonAuthParticipants.length;

  if (participantCount > 1) {
    const onlineCount = nonAuthParticipants.reduce((prev, cur) => {
      if (cur.is_online) {
        prev += 1;
      }
      return prev;
    }, 0);
    onlineStatus = `${onlineCount} online`;
  } else if (participantCount === 1) {
    onlineStatus = nonAuthParticipants[0].is_online ? 'Online' : 'Offline';
  }

  return <span className={cn('', className)}>{onlineStatus}</span>;
};

export default ChatOnlineStatus;
