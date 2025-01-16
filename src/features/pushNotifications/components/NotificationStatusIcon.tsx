import cn from '@/utils/cn';

import { PushNotificationType } from '@/types/PushNotification';
import type { ReactNode } from 'react';

import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';

const styleMap: Record<
  PushNotificationType,
  { color: string; icon: ReactNode }
> = {
  [PushNotificationType.ERROR]: {
    color: 'text-red-400',
    icon: <CircleX className="size-5" />,
  },
  [PushNotificationType.SUCCESS]: {
    color: 'text-green-400',
    icon: <CircleCheck className="size-5" />,
  },
  [PushNotificationType.WARNING]: {
    color: 'text-yellow-400',
    icon: <CircleAlert className="size-5" />,
  },
};

type NotificationStatusIconProps = {
  type: PushNotificationType;
  className?: string;
};

const NotificationStatusIcon = ({
  type,
  className,
}: NotificationStatusIconProps) => {
  return (
    <span
      className={cn(
        'flex items-center justify-center self-start',
        styleMap[type].color,
        className,
      )}
    >
      {styleMap[type].icon}
    </span>
  );
};

export default NotificationStatusIcon;
