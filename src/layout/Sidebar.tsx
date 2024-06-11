import { useAppSelector } from '@/app/hooks';

import { selectAuthData } from '@/features/auth/authSlice';

import UserIcon from '@/components/general/UserIcon';
import NavControls from '@/layout/NavControls';
import { Outlet } from 'react-router-dom';
import { selectIsSidebarOpen } from '@/features/chat/chatSlice';
import cn from '@/utils/cn';

const Sidebar = () => {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
  const authData = useAppSelector(selectAuthData);

  return (
    <aside
      className={cn(
        'text hidden h-dvh w-full max-w-md flex-col-reverse sm:flex sm:flex-row sm:border-r',
        { flex: isSidebarOpen },
      )}
    >
      <div className="flex flex-col items-center justify-between px-2 py-4 sm:border-r">
        <NavControls />
        <UserIcon
          className="hidden sm:flex"
          title={authData?.username}
          src={authData?.profile_image}
          colorClass={authData?.color_class}
          isOnline
        />
      </div>
      <section className="sm:flex-0 w-full flex-1">
        <Outlet />
      </section>
    </aside>
  );
};

export default Sidebar;
