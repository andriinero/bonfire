import { useAppSelector } from '@/app/hooks';
import { useRef } from 'react';

import {
  selectNotificationById,
  useDeleteNotificationMutation,
  usePostMarkAsReadMutation,
} from '../notificationsSlice';

import IconButton from '@/components/general/IconButton';
import TimeStamp from '@/components/general/TimeStamp';
import UserIcon from '@/components/general/UserIcon';
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
      className="flex items-start space-x-4 p-4 transition-colors hover:bg-gray-50"
    >
      <UserIcon
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
      <IconButton
        style="primary"
        className="p-1"
        onClick={handleDismissNotification}
        disabled={isDismissButtonDisabled}
      >
        <X />
      </IconButton>
    </div>
  );
};

export default NotificationItem;
