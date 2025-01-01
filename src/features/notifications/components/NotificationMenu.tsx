import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useState } from 'react';

import {
  notificationMenuStateSet,
  selectIsNotificationMenuOpen,
} from '../notificationsSlice';

import { cn } from '@/lib/utils';

import { NotificationType } from '@/types/Notification';

import Button from '@/components/general/Button';
import IconButton from '@/components/general/IconButton';
import TimeStamp from '@/components/general/TimeStamp';
import UserIcon from '@/components/general/UserIcon';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Bell, X } from 'lucide-react';

const NotificationMenu = () => {
  const isNotificationMenuOpen = useAppSelector(selectIsNotificationMenuOpen);

  const dispatch = useAppDispatch();

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      body: 'mentioned you in a comment',
      type: NotificationType.MESSAGE,
      created: new Date().toString(),
      isRead: false,
      sender: {
        id: '11',
        username: 'Alex',
        colorClass: 'gb',
      },
    },
    {
      id: '2',
      body: 'sent you a friend request',
      type: NotificationType.MESSAGE,
      created: new Date().toString(),
      isRead: false,
    },
    {
      id: '3',
      body: 'shared a document with you',
      type: NotificationType.MESSAGE,
      created: new Date().toString(),
      isRead: true,
    },
  ]);

  const handleToggleMenu = (isOpen: boolean): void => {
    dispatch(notificationMenuStateSet(isOpen));
  };

  const handleDismissNotification = (id: string): void => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleDismissAll = (): void => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Popover open={isNotificationMenuOpen} onOpenChange={handleToggleMenu}>
      <PopoverTrigger asChild>
        <IconButton style="primary" className="relative text-amber-500">
          <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle notifications</span>
        </IconButton>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-none">
          <CardHeader className="border-b p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Notifications</CardTitle>
            </div>
            <CardDescription>
              You have {unreadCount} unread messages
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-auto p-0">
            {notifications.map((notification, index) => (
              <>
                <div
                  key={notification.id}
                  className="flex items-start space-x-4 p-4 transition-colors hover:bg-gray-50"
                >
                  <UserIcon />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Placeholder
                    </p>
                    <p className="text-sm text-gray-700">{notification.body}</p>
                    <div className="flex justify-between">
                      <TimeStamp
                        className="text-muted-foreground text-xs"
                        date={notification.created}
                      />
                    </div>
                  </div>
                  <IconButton
                    style="primary"
                    className="p-1"
                    onClick={() => handleDismissNotification(notification.id)}
                  >
                    <X />
                  </IconButton>
                </div>
                {index !== notifications.length - 1 && <Separator />}
              </>
            ))}
          </CardContent>
          {notifications.length > 0 && (
            <CardFooter className="border-t p-4">
              <Button
                onClick={handleDismissAll}
                style="primary"
                className="w-full"
              >
                Dismiss all
              </Button>
            </CardFooter>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationMenu;
