import { useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';
import useNotificationDismiss from '../hooks/useNotificationDismiss';

import cn from '@/utils/cn';

import { selectPushNotificationById } from '../pushNotificationsSlice';

import { NotificationSlideIn } from '@/styles/animations/SlideIn';
import { PushNotificationType } from '@/types/PushNotification';

import NotificationBody from './NotificationBody';
import NotificationCrossIcon from './NotificationCrossIcon';
import NotificationStatusIcon from './NotificationStatusIcon';

const styleMap: Record<PushNotificationType, { bgColor: string }> = {
  [PushNotificationType.ERROR]: { bgColor: 'bg-red-50' },
  [PushNotificationType.SUCCESS]: { bgColor: 'bg-green-50' },
  [PushNotificationType.WARNING]: { bgColor: 'bg-yellow-50' },
};

type PushNotificationItemProps = {
  id: string;
};

const PushNotificationItem = ({ id }: PushNotificationItemProps) => {
  const notification = useAppSelector(selectPushNotificationById(id))!;
  const { isBeingDismissed, handleNotificationDismiss } =
    useNotificationDismiss(id);

  const type = notification.type;

  return notification ? (
    <motion.li
      key={id}
      variants={NotificationSlideIn}
      initial="initial"
      animate={isBeingDismissed ? 'exit' : 'animate'}
      className={cn(
        'text-md flex items-center justify-between rounded-md p-3 text-sm shadow-md',
        styleMap[type].bgColor,
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
