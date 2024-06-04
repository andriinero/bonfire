import { useMemo } from 'react';
import { useAppDispatch } from './app/hooks';
import useSocketConnection from './hooks/useSocketConnection';

import {
  tokenInitialized,
  useGetAuthDataQuery,
} from './features/auth/authSlice';

import Router from './Router';

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
