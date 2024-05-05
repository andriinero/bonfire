import SignUpPanel from '@/features/auth/components/SignUpPanel';

const SignUp = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-100">
      <main className="w-full max-w-lg space-y-8">
        <img
          className="mx-auto size-12"
          src="/messenger.png"
          alt="Messenger App Icon"
        />
        <h1 className="text-center text-3xl font-bold">
          Create a new account
        </h1>
        <SignUpPanel />
      </main>
    </div>
  );
};

export default SignUp;
