import { useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';

import { selectPushNotificationById } from '../pushNotificationsSlice';

import { PushNotificationType } from '@/types/PushNotification';

import ErrorNotification from './ErrorNotification';

type PushNotificationItemProps = {
  id: string;
};

const PushNotificationItem = ({ id }: PushNotificationItemProps) => {
  const notification = useAppSelector(selectPushNotificationById(id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.25 }}
    >
      {notification?.type === PushNotificationType.ERROR ? (
        <ErrorNotification id={id} error={{}} />
      ) : (
        <p>not implemented</p>
      )}
    </motion.div>
  );
};

export default PushNotificationItem;
