import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Button from '@/components/general/Button';
import { selectIsSignedIn, signedOut } from '@/features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const isSignedIn = useAppSelector(selectIsSignedIn);

  const dispatch = useAppDispatch();

  if (!isSignedIn) return <Navigate to="/sign-in" />;

  const handleSignOutClick = (): void => {
    dispatch(signedOut());
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-bold text-lg text-slate-800">User signed in!</h1>
      <Button onClick={handleSignOutClick} type="button" style="success">
        Sign Out
      </Button>
    </div>
  );
};

export default Home;
