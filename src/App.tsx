import { useMemo } from 'react';
import { useAppDispatch } from './app/hooks';
import useSocketConnection from './hooks/useSocketConnection';

import {
  tokenInitialized,
  useGetAuthDataQuery,
} from './features/auth/authSlice';

import Router from './Router';
import PushNotificationList from './features/pushNotifications/components/PushNotificationList';

const App = () => {
  useSocketConnection();
  useGetAuthDataQuery();
  const dispatch = useAppDispatch();

  useMemo(() => {
    dispatch(tokenInitialized());
  }, [dispatch]);

  return (
    <>
      <Router />
      <PushNotificationList />
    </>
  );
};

export default App;
