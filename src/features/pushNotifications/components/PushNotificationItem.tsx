import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

import {
  pushNotificationRemoved,
  selectPushNotificationById,
} from '../pushNotificationsSlice';

import { PushNotificationType } from '@/types/PushNotification';

import ErrorNotification from './ErrorNotification';

type PushNotificationItemProps = {
  id: string;
};

const NOTIFICATION_UNMOUNT_TIMER = 5000;

const PushNotificationItem = ({ id }: PushNotificationItemProps) => {
  const notification = useAppSelector(selectPushNotificationById(id));

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(pushNotificationRemoved(id));
    }, NOTIFICATION_UNMOUNT_TIMER);
  }, [id, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.25 }}
    >
      {notification?.type === PushNotificationType.ERROR ? (
        <ErrorNotification id={id} />
      ) : (
        <p>not implemented</p>
      )}
    </motion.div>
  );
};

export default PushNotificationItem;
