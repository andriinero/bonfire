import { useAppSelector } from '@/app/hooks';

import { selectPushNotificationsList } from '../pushNotificationsSlice';

import PushNotificationItem from './PushNotificationItem';

const PushNotificationList = () => {
  const list = useAppSelector(selectPushNotificationsList);

  return (
    <ul className="fixed right-0 top-0 z-40 flex w-full flex-col items-stretch space-y-4 p-4 sm:w-auto sm:items-end">
      {list.map((n) => (
        <PushNotificationItem key={n.id} id={n.id} />
      ))}
    </ul>
  );
};

export default PushNotificationList;
