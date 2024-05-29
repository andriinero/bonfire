import { useMemo } from 'react';
import { useAppDispatch } from './app/hooks';

import {
  tokenInitialized,
  useGetAuthDataQuery,
} from './features/auth/authSlice';

import Router from './Router';
import useSocketConnection from './hooks/useSocketConnection';

const App = () => {
  useSocketConnection();
  useGetAuthDataQuery();
  const dispatch = useAppDispatch();

  useMemo(() => {
    dispatch(tokenInitialized());
  }, [dispatch]);

  return <Router />;
};

export default App;
