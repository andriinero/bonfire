import cn from '@/utils/cn';

import { PushNotificationType } from '@/types/PushNotification';
import type { MouseEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const styleMap: Record<PushNotificationType, { color: string }> = {
  [PushNotificationType.ERROR]: { color: 'text-red-400 hover:bg-red-100' },
  [PushNotificationType.SUCCESS]: {
    color: 'text-green-400 hover:bg-green-100',
  },
  [PushNotificationType.WARNING]: {
    color: 'text-yellow-400 hover:bg-yellow-100',
  },
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
    <Button
      onClick={onCrossClick}
      className="size-6 self-start justify-self-end"
      variant="ghost"
      size="icon"
    >
      <X className={cn('rounded text-sm', styleMap[type].color, className)} />
    </Button>
  );
};

export default NotificationCrossIcon;
