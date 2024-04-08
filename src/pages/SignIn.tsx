import { useAppSelector } from '@/app/hooks';
import {
  selectAuthDataFetchedState,
  selectIsSignedIn,
} from '@/features/auth/authSlice';
import SignInPanel from '@/features/auth/components/SignInPanel';
import { Navigate } from 'react-router-dom';

const SignIn = () => {
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const state = useAppSelector(selectAuthDataFetchedState);

  if (isSignedIn) return <Navigate to="/home" />;

  return state === 'loading' ? (
    <></>
  ) : (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-100">
      <main className="w-full max-w-lg space-y-8">
        <img
          className="mx-auto size-12"
          src="/messenger.png"
          alt="Messenger App Icon"
        />
        <h1 className="text-center text-3xl font-bold">
          Sign in to your account
        </h1>
        <SignInPanel />
      </main>
    </div>
  );
};

export default SignIn;
