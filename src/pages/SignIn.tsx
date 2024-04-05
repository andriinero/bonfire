import { useAppDispatch } from '@/app/hooks';
import { dataInitialized } from '@/features/auth/authSlice';
import SignInPanel from '@/features/auth/components/SignInPanel';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-100">
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
