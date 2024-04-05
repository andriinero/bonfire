import SignInPanel from '@/components/SignInPanel';

const SignIn = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-100">
      <main>
        <h1 className="mb-10 text-center text-4xl font-bold">
          Sign in to your account
        </h1>
        <SignInPanel />
      </main>
    </div>
  );
};

export default SignIn;
