import { Outlet } from 'react-router-dom';
import UserIcon from '@/components/general/UserIcon';
import NavControls from '@/features/nav/components/NavControls';
import { useAppSelector } from '@/app/hooks';
import { selectAuthProfileImage } from '@/features/auth/authSlice';

const Sidebar = () => {
  const profileImage = useAppSelector(selectAuthProfileImage);

  return (
    <aside className="text row-start-1 row-end-3 flex h-full border-r">
      <div className="flex flex-col items-center justify-between border-r px-2 py-4">
        <NavControls />
        <UserIcon src={profileImage} isOnline />
      </div>
      <section className="w-full p-4">
        <Outlet />
      </section>
    </aside>
  );
};

export default Sidebar;
