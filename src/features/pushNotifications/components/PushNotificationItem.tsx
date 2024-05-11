import { useAppSelector } from '@/app/hooks';

import { selectPushNotificationById } from '../pushNotificationsSlice';

import { PushNotificationType } from '@/types/PushNotification';

import ErrorNotification from './ErrorNotification';

type PushNotificationItemProps = {
  id: string;
};

const PushNotificationItem = ({ id }: PushNotificationItemProps) => {
  const notification = useAppSelector(selectPushNotificationById(id));

  return notification?.type === PushNotificationType.ERROR ? (
    <ErrorNotification />
  ) : (
    <p>not implemented</p>
  );
};

export default PushNotificationItem;
