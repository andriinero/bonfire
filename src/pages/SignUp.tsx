import AppLogo from '@/components/general/AppLogo';
import SignUpPanel from '@/features/auth/components/SignUpPanel';

const SignUp = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center sm:bg-gray-100">
      <main className="w-full max-w-lg space-y-8">
        <AppLogo />
        <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Create a new account
        </h1>
        <SignUpPanel />
      </main>
    </div>
  );
};

export default SignUp;
