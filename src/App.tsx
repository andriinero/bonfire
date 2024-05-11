import { useMemo } from 'react';
import { useAppDispatch } from './app/hooks';

import {
  tokenInitialized,
  useGetAuthDataQuery,
} from './features/auth/authSlice';

import Router from './Router';

const App = () => {
  useGetAuthDataQuery();
  const dispatch = useAppDispatch();

  useMemo(() => {
    dispatch(tokenInitialized());
  }, [dispatch]);

  return <Router />;
};

export default App;
