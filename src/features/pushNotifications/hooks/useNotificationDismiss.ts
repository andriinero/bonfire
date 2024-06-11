import { useAppDispatch } from '@/app/hooks';
import { useCallback, useEffect } from 'react';

import { pushNotificationRemoved } from '../pushNotificationsSlice';

const NOTIFICATION_UNMOUNT_TIMER = 500000;

const useNotificationDismiss = (id: string) => {
  const dispatch = useAppDispatch();

  const handleNotificationDismiss = useCallback((): void => {
    dispatch(pushNotificationRemoved(id));
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

  return { handleNotificationDismiss };
};

export default useNotificationDismiss;
