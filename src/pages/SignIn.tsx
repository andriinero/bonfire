import { useAppSelector } from '@/app/hooks';

import Paths from '@/constants/Paths';

import { selectIsSignedIn } from '@/features/auth/authSlice';

import AppLogo from '@/components/general/AppLogo';
import SignInPanel from '@/features/auth/components/SignInPanel';
import { Navigate } from 'react-router-dom';

const SignIn = () => {
  const isSignedIn = useAppSelector(selectIsSignedIn);

  if (isSignedIn) return <Navigate to={Paths.Home.BASE + Paths.Home.CHATS} />;

  return (
    <div className="flex min-h-dvh items-center justify-center sm:bg-gray-100">
      <main className="w-full max-w-lg space-y-8">
        <AppLogo />
        <h1 className="text-center text-2xl font-bold text-gray-950">
          Sign in to your account
        </h1>
        <SignInPanel />
      </main>
    </div>
  );
};

export default SignIn;
