import cn from '@/utils/cn';

import { PushNotificationType } from '@/types/PushNotification';

import { CircleAlert, CircleCheck, CircleX, TriangleAlert } from 'lucide-react';

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
      className={cn('mt-0.5 self-start', className, {
        'text-red-400': type === PushNotificationType.ERROR,
        'text-green-400': type === PushNotificationType.SUCCESS,
        'text-yellow-400': type === PushNotificationType.WARNING,
      })}
    >
      {type === PushNotificationType.ERROR ? (
        <CircleX />
      ) : type === PushNotificationType.SUCCESS ? (
        <CircleCheck />
      ) : type === PushNotificationType.WARNING ? (
        <TriangleAlert />
      ) : (
        <CircleAlert />
      )}
    </span>
  );
};

export default NotificationStatusIcon;
