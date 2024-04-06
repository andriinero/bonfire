import { useEffect } from 'react';
import Router from './Router';
import { useAppDispatch } from './app/hooks';
import { authDataFetched } from './features/auth/authSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authDataFetched());
  }, [dispatch]);

  return <Router />;
};

export default App;
