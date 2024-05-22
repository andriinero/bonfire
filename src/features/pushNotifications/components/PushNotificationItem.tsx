import { useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';
import useNotificationDismiss from '../hooks/useNotificationDismiss';

import cn from '@/utils/cn';

import { selectPushNotificationById } from '../pushNotificationsSlice';

import { SlideIn } from '@/styles/animations/SlideIn';

import IconButton from '@/components/general/IconButton';
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

const PushNotificationItem = ({ id }: PushNotificationItemProps) => {
  const notification = useAppSelector(selectPushNotificationById(id));
  const { handleNotificationDismiss } = useNotificationDismiss(id);

  const type = notification?.type;

  return notification ? (
    <motion.div
      key={id}
      initial={SlideIn.initial}
      animate={SlideIn.animate}
      transition={SlideIn.transition}
      className={cn(
        'flex items-center justify-between gap-8 rounded-md p-4 text-sm shadow',
        {
          'bg-red-50': type === PushNotificationType.ERROR,
          'bg-green-50': type === PushNotificationType.SUCCESS,
          'bg-yellow-50': type === PushNotificationType.WARNING,
        },
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn('mt-0.5 self-start', {
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
          className={cn('text-medium space-y-0.5', {
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
            <ul className="list-disc pl-6 font-normal">
              {notification.list.map((errorMessage, index) => (
                <li
                  key={index}
                  className={cn({
                    'text-red-700': type === PushNotificationType.ERROR,
                    'text-green-700': type === PushNotificationType.SUCCESS,
                    'text-yellow-700': type === PushNotificationType.WARNING,
                  })}
                >
                  {errorMessage}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      <IconButton
        className={cn('self-start justify-self-end p-0.5', {
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
