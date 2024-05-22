import usePageUnmountNotificationsClear from '@/features/pushNotifications/hooks/usePageNotificationsClear';

import AppLogo from '@/components/general/AppLogo';
import SignUpPanel from '@/features/auth/components/SignUpPanel';
import PushNotificationList from '@/features/pushNotifications/components/PushNotificationList';

const SignUp = () => {
  usePageUnmountNotificationsClear();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-100">
      <main className="w-full max-w-lg space-y-8">
        <AppLogo />
        <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Create a new account
        </h1>
        <SignUpPanel />
      </main>
      <PushNotificationList />
    </div>
  );
};

export default SignUp;
