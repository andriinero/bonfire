import { useAppSelector } from '@/app/hooks';

import { selectAuthData } from '@/features/auth/authSlice';

import UserIcon from '@/components/general/UserIcon';
import NavControls from '@/layout/NavControls';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  const authData = useAppSelector(selectAuthData);

  return (
    <aside className="text hidden w-full max-w-md flex-col border-r sm:flex sm:flex-row">
      <div className="flex flex-col items-center justify-between border-r px-2 py-4">
        <NavControls />
        <UserIcon
          title={authData?.username}
          src={authData?.profile_image}
          colorClass={authData?.color_class}
          isOnline
        />
      </div>
      <section className="w-full">
        <Outlet />
      </section>
    </aside>
  );
};

export default Sidebar;
