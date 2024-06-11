import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import useSocketConnection from './hooks/useSocketConnection';

import {
  tokenInitialized,
  useGetAuthDataQuery,
} from './features/auth/authSlice';

import { Analytics } from '@vercel/analytics/react';
import Router from './Router';
import PushNotificationList from './features/pushNotifications/components/PushNotificationList';
import { selectHasPushNotifications } from './features/pushNotifications/pushNotificationsSlice';

const App = () => {
  useSocketConnection();
  useGetAuthDataQuery();

  const hasPushNotifications = useAppSelector(selectHasPushNotifications);

  const dispatch = useAppDispatch();

  useMemo(() => {
    dispatch(tokenInitialized());
  }, [dispatch]);

  return (
    <>
      <Analytics />
      <Router />
      {hasPushNotifications && <PushNotificationList />}
    </>
  );
};

export default App;
