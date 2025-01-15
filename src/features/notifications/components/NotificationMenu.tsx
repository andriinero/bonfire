import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  notificationMenuStateSet,
  selectIsNotificationMenuOpen,
  useDeleteAllNotificationsMutation,
  useGetNotificationsQuery,
} from '../notificationsSlice';

import Spinner from '@/components/general/Spinner';
import { BellIcon } from '@/components/ui/bell';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import cn from '@/utils/cn';
import NotificationItem from './NotificationItem';

const NotificationMenu = () => {
  const isNotificationMenuOpen = useAppSelector(selectIsNotificationMenuOpen);
  const {
    data: notifications,
    isLoading: areNotificationsLoading,
    isSuccess,
  } = useGetNotificationsQuery({
    page: 0,
  });
  const [
    deleteAllNotifications,
    { isLoading: isDeleteAllNotificationsLoading },
  ] = useDeleteAllNotificationsMutation();
  const dispatch = useAppDispatch();

  const handleToggleMenu = (isOpen: boolean) => {
    dispatch(notificationMenuStateSet(isOpen));
  };

  const handleDismissAll = () => {
    deleteAllNotifications();
  };

  const unreadCount = isSuccess
    ? notifications.filter((n) => !n.isRead).length
    : 0;
  const isDismissButtonDisabled = isDeleteAllNotificationsLoading;
  const areNotificationsPresent =
    isSuccess && notifications && notifications.length > 0;

  return (
    <Popover open={isNotificationMenuOpen} onOpenChange={handleToggleMenu}>
      <PopoverTrigger asChild>
        <Button
          className="relative text-amber-500 hover:text-amber-500"
          variant="ghost"
          size="icon"
        >
          <BellIcon isActive={unreadCount > 0} />
          {unreadCount > 0 && (
            <span className="absolute right-0 top-0 mr-[7px] mt-[7px] flex size-[13px] items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-white ring-2 ring-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-none p-0 shadow-none" align="end">
        <Card>
          <CardHeader
            className={cn('flex-row justify-between gap-2 space-y-0 p-4', {
              'border-b': areNotificationsPresent,
            })}
          >
            <div className="space-y-1.5">
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>
                {areNotificationsLoading ? (
                  <></>
                ) : isSuccess ? (
                  notifications.length > 0 ? (
                    `You have ${unreadCount} unread messages`
                  ) : (
                    "You're all caught up!"
                  )
                ) : (
                  <p>It's quiet here... too quiet.</p>
                )}
              </CardDescription>
            </div>
            {areNotificationsPresent && (
              <Button
                onClick={handleDismissAll}
                disabled={isDismissButtonDisabled}
                variant="text"
                size="lean"
                className="font-semibold text-gray-500"
              >
                Dismiss All
              </Button>
            )}
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-auto rounded-b-md p-0">
            {areNotificationsLoading ? (
              <div className="p-4">
                <Spinner />
              </div>
            ) : (
              areNotificationsPresent &&
              notifications.map((n, index) => (
                <div key={n.id}>
                  <NotificationItem key={n.id} id={n.id} />
                  {index !== notifications.length - 1 && <Separator />}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationMenu;
