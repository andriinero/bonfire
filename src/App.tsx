import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import useSocketConnection from './hooks/useSocketConnection';

import {
  tokenInitialized,
  useGetAuthDataQuery,
} from './features/auth/authSlice';
import { selectIsChatDrawerOpen } from './features/drawer/drawerSlice';
import { selectHasPushNotifications } from './features/pushNotifications/pushNotificationsSlice';

import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence } from 'framer-motion';
import Router from './Router';
import Drawer from './features/drawer/components/Drawer';
import PushNotificationList from './features/pushNotifications/components/PushNotificationList';

const App = () => {
  useSocketConnection();
  useGetAuthDataQuery();

  const isChatDrawerOpen = useAppSelector(selectIsChatDrawerOpen);
  const hasPushNotifications = useAppSelector(selectHasPushNotifications);

  const dispatch = useAppDispatch();

  useMemo(() => {
    dispatch(tokenInitialized());
  }, [dispatch]);

  return (
    <>
      <Analytics />
      <Router />
      <AnimatePresence>{isChatDrawerOpen && <Drawer />}</AnimatePresence>
      {hasPushNotifications && <PushNotificationList />}
    </>
  );
};

export default App;
