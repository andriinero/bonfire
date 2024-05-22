import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';

import { pushNotificationsListCleared } from '../pushNotificationsSlice';

const usePageUnmountNotificationsClear = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(pushNotificationsListCleared());
    };
  }, [dispatch]);
};

export default usePageUnmountNotificationsClear;
