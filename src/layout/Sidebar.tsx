import { useAppDispatch, useAppSelector } from '@/app/hooks';

import cn from '@/utils/cn';

import { selectIsSidebarOpen } from '@/features/chat/chatSlice';
import {
  profileEditPanelOpenStateSet,
  selectIsProfileEditPanelOpen,
} from '@/features/profile/profileSlice';

import Modal from '@/components/general/Modal';
import ProfileEditPanel from '@/features/profile/components/ProfileEditPanel';
import NavControls from '@/layout/NavControls';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);
  const isEditProfilePanelOpen = useAppSelector(selectIsProfileEditPanelOpen);
  const dispatch = useAppDispatch();

  const handleCloseProfileModal = () => {
    dispatch(profileEditPanelOpenStateSet(false));
  };

  return (
    <aside
      className={cn(
        'text hidden h-dvh w-full max-w-md flex-col-reverse sm:flex sm:flex-row sm:border-r',
        { flex: isSidebarOpen },
      )}
    >
      <div className="flex flex-col items-center justify-between border-t p-3 sm:border-r sm:py-4">
        <NavControls />
        <Modal
          className="max-w-xl"
          onBackdropClick={handleCloseProfileModal}
          isOpen={isEditProfilePanelOpen}
        >
          <ProfileEditPanel />
        </Modal>
      </div>
      <section className="sm:flex-0 w-full flex-1">
        <Outlet />
      </section>
    </aside>
  );
};

export default Sidebar;
