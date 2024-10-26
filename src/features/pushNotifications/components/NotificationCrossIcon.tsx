import cn from '@/utils/cn';

import { PushNotificationType } from '@/types/PushNotification';
import type { MouseEventHandler } from 'react';

import IconButton from '@/components/general/IconButton';
import XIcon from '@/components/general/XIcon';

const styleMap: Record<PushNotificationType, { color: string }> = {
  [PushNotificationType.ERROR]: { color: 'text-red-400 hover:bg-red-100' },
  [PushNotificationType.SUCCESS]: { color: 'text-red-400 hover:bg-green-100' },
  [PushNotificationType.WARNING]: { color: 'text-red-400 hover:bg-yellow-100' },
};

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
    <IconButton className="self-start justify-self-end p-0.5">
      <XIcon
        className={cn('rounded text-sm', styleMap[type].color, className)}
        onClick={onCrossClick}
      />
    </IconButton>
  );
};

export default NotificationCrossIcon;
