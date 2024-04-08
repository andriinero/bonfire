import { ReactNode } from 'react';

import { Outlet } from 'react-router-dom';
import UserIcon from '@/components/general/UserIcon';
import NavControls from '@/features/nav/components/NavControls';

const Sidebar = () => {
  return (
    <aside className="text flex h-full border-r">
      <div className="flex flex-col items-center justify-between border-r px-2 py-4">
        <NavControls />
        <UserIcon />
      </div>
      <section className="p-4 w-full">
        <Outlet />
      </section>
    </aside>
  );
};

export default Sidebar;
