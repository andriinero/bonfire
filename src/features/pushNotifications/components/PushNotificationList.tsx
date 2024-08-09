import { useAppSelector } from '@/app/hooks';

import { selectPushNotificationsList } from '../pushNotificationsSlice';

import PushNotificationItem from './PushNotificationItem';

const PushNotificationList = () => {
  const list = useAppSelector(selectPushNotificationsList);

  return (
    <ul className="fixed right-0 top-0 z-10 flex flex-col items-end space-y-4 p-4">
      {list.map((n) => (
        <PushNotificationItem key={n._id} id={n._id} />
      ))}
    </ul>
  );
};

export default PushNotificationList;
