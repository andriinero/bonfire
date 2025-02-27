import { useAppSelector } from '@/app/hooks';
import { useRef } from 'react';

import {
  selectNotificationById,
  useDeleteNotificationMutation,
  usePostMarkAsReadMutation,
} from '../notificationsSlice';

import TimeStamp from '@/components/general/TimeStamp';
import UserAvatar from '@/components/general/UserAvatar';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const MARK_AS_READ_POST_DELAY = 3000;

type NotificationItemProps = { id: string };

const NotificationItem = ({ id }: NotificationItemProps) => {
  const timeoutId = useRef<NodeJS.Timeout>();

  const notification = useAppSelector(selectNotificationById({ page: 0, id }));
  const [postMarkAsRead, { isLoading: isMarkAsReadLoading }] =
    usePostMarkAsReadMutation();
  const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

  const handleMarkAsRead = () => {
    if (!timeoutId.current && !notification?.isRead && !isMarkAsReadLoading) {
      timeoutId.current = setTimeout(() => {
        postMarkAsRead(id);
        timeoutId.current = undefined;
      }, MARK_AS_READ_POST_DELAY);
    }
  };

  const handleDismissNotification = () => {
    deleteNotification(id);
  };

  const isDismissButtonDisabled = isLoading;

  return (
    <div
      onMouseEnter={handleMarkAsRead}
      className="flex items-start space-x-4 bg-gray-50 p-4 transition-colors"
    >
      <UserAvatar
        style="sm"
        title={notification?.sender.username}
        colorClass={notification?.sender.colorClass}
      />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {notification?.sender.username}
        </p>
        <p className="text-sm text-gray-700">{notification?.body}</p>
        <div className="flex justify-between">
          <TimeStamp
            className="text-muted-foreground text-xs"
            date={notification?.created || ''}
          />
          {!notification?.isRead && (
            <p className="text-xs font-medium uppercase text-amber-500">NEW</p>
          )}
        </div>
      </div>
      <Button
        className="[&_svg]:size-4"
        variant="ghost"
        size="smallIcon"
        onClick={handleDismissNotification}
        disabled={isDismissButtonDisabled}
      >
        <X />
      </Button>
    </div>
  );
};

export default NotificationItem;
