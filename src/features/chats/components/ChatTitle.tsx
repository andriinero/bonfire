import cn from '@/utils/cn';

import { UserData } from '@/types/UserData';

type ChatTitleProps = { participants: UserData[]; className?: string };

const MAX_N_OF_NAMES = 2;

const ChatTitle = ({ participants, className }: ChatTitleProps) => {
  const names = participants.map((p) => p.username);
  const firstNames = names.slice(0, MAX_N_OF_NAMES);

  const title = `${firstNames.join(', ')} ${names.length > 2 ? `and ${names.length - MAX_N_OF_NAMES} other(s)` : ''}`;

  return (
    <p className={cn('font-medium text-neutral-800', className)}>{title}</p>
  );
};

export default ChatTitle;
