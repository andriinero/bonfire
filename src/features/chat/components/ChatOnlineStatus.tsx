import useChatRoomOnlineStatus from '@/features/chatRooms/hooks/useChatRoomOnlineStatus';

import cn from '@/utils/cn';

type ChatOnlineStatusProps = {
  id: string;
  className?: string;
};

const ChatOnlineStatus = ({ id, className }: ChatOnlineStatusProps) => {
  const status = useChatRoomOnlineStatus(id);

  return <span className={cn('', className)}>{status}</span>;
};

export default ChatOnlineStatus;
