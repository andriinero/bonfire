import { useAppSelector } from '@/app/hooks';

import { selectPushNotificationsList } from '../pushNotificationsSlice';

import PushNotificationItem from './PushNotificationItem';

const PushNotificationList = () => {
  const list = useAppSelector(selectPushNotificationsList);

  return (
    <div className="fixed right-8 top-8 w-full max-w-60 space-y-4">
      {list.map((n) => (
        <PushNotificationItem key={n._id} id={n._id} />
      ))}
    </div>
  );
};

export default PushNotificationList;
