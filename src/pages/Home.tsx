import { useAppDispatch } from '@/app/hooks';
import Button from '@/components/general/Button';
import { signedOut } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = (): void => {
    dispatch(signedOut());
    navigate('/sign-in');
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
