import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';

import { pushNotificationRemoved } from '../pushNotificationsSlice';

const NOTIFICATION_UNMOUNT_TIMER = 5000;

const useNotificationDismiss = (id: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(pushNotificationRemoved(id));
    }, NOTIFICATION_UNMOUNT_TIMER);

    return () => {
      clearTimeout(timeout);
    };
  }, [id, dispatch]);

  const handleNotificationDismiss = (): void => {
    dispatch(pushNotificationRemoved(id));
  };

  return { handleNotificationDismiss };
};

export default useNotificationDismiss;
