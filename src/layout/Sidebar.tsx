import { useAppSelector } from '@/app/hooks';

import { selectIsSidebarOpen } from '@/features/chat/chatSlice';

import cn from '@/utils/cn';

import NavControls from '@/layout/NavControls';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

  return (
    <aside
      className={cn(
        'text hidden h-dvh w-full max-w-md flex-col-reverse sm:flex sm:flex-row sm:border-r',
        { flex: isSidebarOpen },
      )}
    >
      <div className="flex flex-col items-center justify-between border-t p-3 sm:border-r sm:py-4">
        <NavControls />
      </div>
      <section className="sm:flex-0 w-full flex-1">
        <Outlet />
      </section>
    </aside>
  );
};

export default Sidebar;
