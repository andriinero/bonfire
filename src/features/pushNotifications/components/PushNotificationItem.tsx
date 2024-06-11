import { useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';
import useNotificationDismiss from '../hooks/useNotificationDismiss';

import cn from '@/utils/cn';

import { selectPushNotificationById } from '../pushNotificationsSlice';

import { SlideIn } from '@/styles/animations/SlideIn';
import { PushNotificationType } from '@/types/PushNotification';

import NotificationBody from './NotificationBody';
import NotificationCrossIcon from './NotificationCrossIcon';
import NotificationStatusIcon from './NotificationStatusIcon';

type PushNotificationItemProps = {
  id: string;
};

const PushNotificationItem = ({ id }: PushNotificationItemProps) => {
  const notification = useAppSelector(selectPushNotificationById(id));
  const { handleNotificationDismiss } = useNotificationDismiss(id);

  const type = notification?.type;

  return notification ? (
    <motion.li
      key={id}
      initial={SlideIn.initial}
      animate={SlideIn.animate}
      transition={SlideIn.transition}
      className={cn(
        'flex items-center justify-between rounded-md p-4 text-sm shadow-md',
        {
          'bg-red-50': type === PushNotificationType.ERROR,
          'bg-green-50': type === PushNotificationType.SUCCESS,
          'bg-yellow-50': type === PushNotificationType.WARNING,
        },
      )}
    >
      <div className="flex w-full items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <NotificationStatusIcon type={notification.type} />
          <NotificationBody
            type={notification.type}
            body={notification.body}
            list={notification.list}
          />
        </div>
        <NotificationCrossIcon
          type={notification.type}
          onCrossClick={handleNotificationDismiss}
        />
      </div>
    </motion.li>
  ) : (
    <></>
  );
};

export default PushNotificationItem;
