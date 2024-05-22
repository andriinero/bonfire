import cn from '@/utils/cn';

import { PushNotificationType } from '@/types/PushNotification';

import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleXmark,
  FaTriangleExclamation,
} from 'react-icons/fa6';

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
        <FaCircleXmark size="1rem" />
      ) : type === PushNotificationType.SUCCESS ? (
        <FaCircleCheck size="1rem" />
      ) : type === PushNotificationType.WARNING ? (
        <FaTriangleExclamation size="1rem" />
      ) : (
        <FaCircleExclamation size="1rem" />
      )}
    </span>
  );
};

export default NotificationStatusIcon;
