import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  pushNotificationRemoved,
  selectPushNotificationById,
} from '../pushNotificationsSlice';

import cn from '@/utils/cn';

import IconButton from '@/components/general/IconButton';
import { FaCircleXmark, FaXmark } from 'react-icons/fa6';

type ErrorNotificationProps = {
  id: string;
  visible?: boolean;
  className?: string;
};

const ErrorNotification = ({
  id,
  visible = true,
  className,
}: ErrorNotificationProps) => {
  const notification = useAppSelector(selectPushNotificationById(id));

  const dispatch = useAppDispatch();

  const handleNotificationDismiss = (): void => {
    dispatch(pushNotificationRemoved(id));
  };

  return (
    <div
      className={cn(
        'invisible flex items-center justify-between gap-8 rounded-md bg-red-50 p-4 text-sm shadow-sm',
        className,
        {
          visible: visible,
        },
      )}
    >
      <div className="flex items-center gap-3">
        <span className="mt-0.5 text-red-400">
          <FaCircleXmark size="1rem" />
        </span>
        <div className="text-medium text-red-800">
          {notification?.body ? (
            <p>{notification?.body}</p>
          ) : (
            <p>Internal Server Error 500</p>
          )}
          {notification?.list ? (
            notification.list.map(() => (
              <ul className="list-disc pl-6 font-normal text-red-700">{}</ul>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <IconButton
        className="justify-self-end p-0.5 text-red-300 hover:bg-red-100"
        onClick={handleNotificationDismiss}
      >
        <FaXmark />
      </IconButton>
    </div>
  );
};

export default ErrorNotification;
