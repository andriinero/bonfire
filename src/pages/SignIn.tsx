import SignInPanel from '@/components/SignInPanel';

const SignIn = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-100">
      <main className="space-y-8">
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
