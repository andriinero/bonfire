import { useEffect } from 'react';
import Router from './Router';
import { useAppDispatch } from './app/hooks';
import { tokenInitialized } from './features/auth/authSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tokenInitialized());
  }, [dispatch]);

  return <Router />;
};

export default App;
