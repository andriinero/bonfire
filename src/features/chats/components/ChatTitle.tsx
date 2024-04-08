import cn from '@/utils/cn';

import { UserData } from '@/types/UserData';

type ChatTitleProps = { participants: UserData[]; className?: string };

const ChatTitle = ({ className }: ChatTitleProps) => {
  return <p className={cn('', className)}></p>;
};

export default ChatTitle;
