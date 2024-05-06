import SignUpPanel from '@/features/auth/components/SignUpPanel';

const SignUp = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-100">
      <main className="w-full max-w-lg space-y-8">
        <img
          className="mx-auto size-10"
          src="/messenger.png"
          alt="Messenger App Icon"
        />
        <h1 className="text-center text-2xl tracking-tight font-bold text-gray-900">
          Create a new account
        </h1>
        <SignUpPanel />
      </main>
    </div>
  );
};

export default SignUp;
