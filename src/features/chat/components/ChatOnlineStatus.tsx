import cn from '@/utils/cn';

import useChatRoomOnlineStatus from '@/features/chatRooms/hooks/useChatRoomOnlineStatus';

type ChatOnlineStatusProps = {
  id: string;
  className?: string;
};

const ChatOnlineStatus = ({ id, className }: ChatOnlineStatusProps) => {
  const status = useChatRoomOnlineStatus(id);

  return <span className={cn('', className)}>{status}</span>;
};

export default ChatOnlineStatus;
