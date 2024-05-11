import { useAppSelector } from '@/app/hooks';

import { selectPushNotificationsList } from '../pushNotificationsSlice';

import PushNotificationItem from './PushNotificationItem';

const PushNotificationList = () => {
  const list = useAppSelector(selectPushNotificationsList);

  return (
    <div className="absolute right-8 top-8 max-w-sm">
      {list.map((n) => (
        <PushNotificationItem key={n._id} id={n._id} />
      ))}
    </div>
  );
};

export default PushNotificationList;
