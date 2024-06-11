import useChatRoomOnlineStatus from '@/features/chatRooms/hooks/useChatRoomOnlineStatus';

import cn from '@/utils/cn';

type ChatOnlineStatusProps = {
  chatRoomId: string;
  className?: string;
};

const ChatOnlineStatus = ({ chatRoomId, className }: ChatOnlineStatusProps) => {
  const status = useChatRoomOnlineStatus(chatRoomId);

  return <span className={cn('', className)}>{status}</span>;
};

export default ChatOnlineStatus;
