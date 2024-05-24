import { useMemo } from 'react';
import { useAppDispatch } from './app/hooks';
import useOnlineConnection from './hooks/useOnlineConnection';

import {
  tokenInitialized,
  useGetAuthDataQuery,
} from './features/auth/authSlice';

import Router from './Router';

const App = () => {
  useOnlineConnection();
  useGetAuthDataQuery();
  const dispatch = useAppDispatch();

  useMemo(() => {
    dispatch(tokenInitialized());
  }, [dispatch]);

  return <Router />;
};

export default App;
