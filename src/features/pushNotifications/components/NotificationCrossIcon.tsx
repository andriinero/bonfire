import cn from '@/utils/cn';

import { PushNotificationType } from '@/types/PushNotification';
import type { MouseEventHandler } from 'react';

import IconButton from '@/components/general/IconButton';
import XIcon from '@/components/general/XIcon';

type NotificationCrossIconProps = {
  type: PushNotificationType;
  onCrossClick: MouseEventHandler;
  className?: string;
};

const NotificationCrossIcon = ({
  type,
  onCrossClick,
  className,
}: NotificationCrossIconProps) => {
  return (
    <IconButton
      className={cn('self-start justify-self-end p-0.5', className, {
        'text-red-400 hover:bg-red-100': type === PushNotificationType.ERROR,
        'text-green-400 hover:bg-green-100':
          type === PushNotificationType.SUCCESS,
        'text-yellow-400 hover:bg-yellow-100':
          type === PushNotificationType.WARNING,
      })}
      onClick={onCrossClick}
    >
      <XIcon />
    </IconButton>
  );
};

export default NotificationCrossIcon;
