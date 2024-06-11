import Paths from '@/constants/Paths';

import AppLink from '@/components/general/AppLink';
import AppLogo from '@/components/general/AppLogo';
import PushNotificationList from '@/features/pushNotifications/components/PushNotificationList';
import { FaArrowLeft } from 'react-icons/fa6';

const NotFound404 = () => {
  return (
    <div className="grid h-dvh grid-rows-3">
      <header className="p-8">
        <AppLogo className="mx-0 size-10 self-start" />
      </header>
      <main className="flex flex-col items-start justify-center gap-6 p-8">
        <p className="font-semibold text-amber-500">404</p>
        <h1 className="text-5xl font-bold">Page not found</h1>
        <p className="text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <AppLink
          to={Paths.Auth.SIGN_IN}
          className="mt-8 flex items-center gap-2 text-amber-500"
        >
          <FaArrowLeft size="1rem" />
          <p className="font-semibold">Back to home</p>
        </AppLink>
      </main>
      <footer />
      <PushNotificationList />
    </div>
  );
};

export default NotFound404;
