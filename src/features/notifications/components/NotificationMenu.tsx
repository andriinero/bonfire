import { useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/general/Button';
import IconButton from '@/components/general/IconButton';
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
import { useAppSelector } from '@/app/hooks';
import { selectIsNotificationMenuOpen } from '../notificationsSlice';

interface Notification {
  id: string;
  avatar: string;
  name: string;
  description: string;
  time: string;
  read: boolean;
}

const NotificationMenu = () => {
  const isNotificationMenuOpen = useAppSelector(selectIsNotificationMenuOpen);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      avatar: '/avatars/01.png',
      name: 'Alice Johnson',
      description: 'mentioned you in a comment',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      avatar: '/avatars/02.png',
      name: 'Bob Smith',
      description: 'sent you a friend request',
      time: '15 min ago',
      read: false,
    },
    {
      id: '3',
      avatar: '/avatars/03.png',
      name: 'Charlie Davis',
      description: 'shared a document with you',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '4',
      avatar: '/avatars/04.png',
      name: 'Diana Miller',
      description: 'liked your post',
      time: '2 hours ago',
      read: true,
    },
  ]);

  const handleToggleMenu = (): void => {};

  const handleMarkAllAsRead = (): void => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDismissNotification = (id: string): void => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
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
          <CardContent className="max-h-[300px] overflow-auto px-0">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={cn(
                  'hover:bg-muted/50 flex items-start space-x-4 p-4 transition-colors',
                  !notification.read && 'bg-muted/30',
                )}
              >
                <UserIcon title={notification.name} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {notification.description}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {notification.time}
                  </p>
                </div>
                <IconButton
                  style="primary"
                  className="p-1"
                  onClick={() => handleDismissNotification(notification.id)}
                >
                  <X />
                </IconButton>
                {index < notifications.length - 1 && (
                  <Separator className="absolute bottom-0 left-4 right-4" />
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button style="hollow" className="w-full">
              Dismiss all
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationMenu;
