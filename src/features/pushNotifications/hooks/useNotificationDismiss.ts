import { useAppDispatch } from '@/app/hooks';
import { useCallback, useEffect, useState } from 'react';

import { pushNotificationRemoved } from '../pushNotificationsSlice';

const NOTIFICATION_UNMOUNT_TIMER = 5000;

const useNotificationDismiss = (id: string) => {
  const [isBeingDismissed, setIsBeingDismissed] = useState(false);
  const dispatch = useAppDispatch();

  const handleNotificationDismiss = useCallback((): void => {
    setIsBeingDismissed(true);
    setTimeout(() => {
      dispatch(pushNotificationRemoved(id));
    }, 300);
  }, [id, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(
      handleNotificationDismiss,
      NOTIFICATION_UNMOUNT_TIMER,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [id, handleNotificationDismiss, dispatch]);

  return { isBeingDismissed, handleNotificationDismiss };
};

export default useNotificationDismiss;
