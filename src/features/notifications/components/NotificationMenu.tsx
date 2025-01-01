import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  notificationMenuStateSet,
  selectIsNotificationMenuOpen,
  useGetNotificationsQuery,
} from '../notificationsSlice';

import Button from '@/components/general/Button';
import IconButton from '@/components/general/IconButton';
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
import { Bell } from 'lucide-react';
import NotificationItem from './NotificationItem';

const NotificationMenu = () => {
  const { data: notifications, isSuccess } = useGetNotificationsQuery({
    page: 0,
  });
  const isNotificationMenuOpen = useAppSelector(selectIsNotificationMenuOpen);

  const dispatch = useAppDispatch();

  const handleToggleMenu = (isOpen: boolean): void => {
    dispatch(notificationMenuStateSet(isOpen));
  };

  const handleDismissAll = (): void => {};

  const unreadCount = isSuccess
    ? notifications.filter((n) => !n.isRead).length
    : 0;

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
            {isSuccess &&
              notifications.map((n, index) => (
                <>
                  <NotificationItem id={n.id} />
                  {index !== notifications.length - 1 && <Separator />}
                </>
              ))}
          </CardContent>
          {isSuccess && notifications.length > 0 && (
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
