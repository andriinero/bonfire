import UserIcon from '@/components/general/UserIcon';
import NavControls from '@/features/nav/components/NavControls';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
type SidebarProps = { children?: ReactNode };

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className="text flex h-full border-r">
      <div className="flex flex-col items-center justify-between border-r px-2 py-4">
        <NavControls />
        <UserIcon />
      </div>
      <section className="px-2 py-4">
        <Outlet />
      </section>
    </aside>
  );
};

export default Sidebar;
