import NavControls from '@/features/nav/components/NavControls';
import { ReactNode } from 'react';
type SidebarProps = { children?: ReactNode };

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className="text h-full border-r px-2 py-4">
      <NavControls />
      <section>{children}</section>
    </aside>
  );
};

export default Sidebar;
