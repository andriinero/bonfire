import cn from '@/utils/cn';

import { PushNotificationType } from '@/types/PushNotification';
import type { ReactNode } from 'react';

import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';

const styleMap: Record<
  PushNotificationType,
  { color: string; icon: ReactNode }
> = {
  [PushNotificationType.ERROR]: { color: 'text-red-400', icon: <CircleX /> },
  [PushNotificationType.SUCCESS]: {
    color: 'text-green-400',
    icon: <CircleCheck />,
  },
  [PushNotificationType.WARNING]: {
    color: 'text-yellow-400',
    icon: <CircleAlert />,
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
    <span className={cn('mt-0.5 self-start', styleMap[type].color, className)}>
      {styleMap[type].icon}
    </span>
  );
};

export default NotificationStatusIcon;
