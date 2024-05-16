import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

import cn from '@/utils/cn';

import {
  pushNotificationRemoved,
  selectPushNotificationById,
} from '../pushNotificationsSlice';

import IconButton from '@/components/general/IconButton';
import { SlideIn } from '@/styles/animations/SlideIn';
import { PushNotificationType } from '@/types/PushNotification';
import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleXmark,
  FaTriangleExclamation,
  FaXmark,
} from 'react-icons/fa6';

type PushNotificationItemProps = {
  id: string;
};

const NOTIFICATION_UNMOUNT_TIMER = 5000;

const PushNotificationItem = ({ id }: PushNotificationItemProps) => {
  const notification = useAppSelector(selectPushNotificationById(id));
  const type = notification?.type;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(pushNotificationRemoved(id));
    }, NOTIFICATION_UNMOUNT_TIMER);

    return () => {
      clearTimeout(timeout);
    };
  }, [id, dispatch]);

  const handleNotificationDismiss = (): void => {
    dispatch(pushNotificationRemoved(id));
  };

  return notification ? (
    <motion.div
      key={id}
      initial={SlideIn.initial}
      animate={SlideIn.animate}
      transition={SlideIn.transition}
      className={cn(
        'flex items-center justify-between gap-8 rounded-md p-4 text-sm shadow-sm',
        {
          'bg-red-50': type === PushNotificationType.ERROR,
          'bg-green-50': type === PushNotificationType.SUCCESS,
          'bg-yellow-50': type === PushNotificationType.WARNING,
        },
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn('mt-0.5', {
            'text-red-400': type === PushNotificationType.ERROR,
            'text-green-400': type === PushNotificationType.SUCCESS,
            'text-yellow-400': type === PushNotificationType.WARNING,
          })}
        >
          {type === PushNotificationType.ERROR ? (
            <FaCircleXmark size="1rem" />
          ) : type === PushNotificationType.SUCCESS ? (
            <FaCircleCheck size="1rem" />
          ) : type === PushNotificationType.WARNING ? (
            <FaTriangleExclamation size="1rem" />
          ) : (
            <FaCircleExclamation size="1rem" />
          )}
        </span>
        <div
          className={cn('text-medium', {
            'text-red-800': type === PushNotificationType.ERROR,
            'text-green-800': type === PushNotificationType.SUCCESS,
            'text-yellow-800': type === PushNotificationType.WARNING,
          })}
        >
          {notification?.body ? (
            <p>{notification?.body}</p>
          ) : (
            <p>Internal Server Error 500</p>
          )}
          {notification?.list ? (
            notification.list.map(() => (
              <ul
                className={cn('list-disc pl-6 font-normal', {
                  'text-red-700': type === PushNotificationType.ERROR,
                  'text-green-700': type === PushNotificationType.SUCCESS,
                  'text-yellow-700': type === PushNotificationType.WARNING,
                })}
              ></ul>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <IconButton
        className={cn('justify-self-end p-0.5', {
          'text-red-400 hover:bg-red-100': type === PushNotificationType.ERROR,
          'text-green-400 hover:bg-green-100':
            type === PushNotificationType.SUCCESS,
          'text-yellow-400 hover:bg-yellow-100':
            type === PushNotificationType.WARNING,
        })}
        onClick={handleNotificationDismiss}
      >
        <FaXmark size="1rem" />
      </IconButton>
    </motion.div>
  ) : (
    <></>
  );
};

export default PushNotificationItem;
