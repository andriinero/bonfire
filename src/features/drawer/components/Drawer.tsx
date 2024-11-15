import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';

import { drawerClosed, selectCurrentDrawerPanelType } from '../drawerSlice';

import { DrawerSlideIn } from '@/styles/animations/SlideIn';
import type { ReactNode } from 'react';
import { DrawerPanelType } from '../types/DrawerPanel';

import Backdrop from '@/components/general/Backdrop';
import IconButton from '@/components/general/IconButton';
import XIcon from '@/components/general/XIcon';
import ChatDrawerPanel from '@/features/chat/components/ChatDrawer';
import useEscapeListener from '@/hooks/useCloseModalListener';

const drawerPanelMap: Record<DrawerPanelType, ReactNode> = {
  [DrawerPanelType.CHAT]: <ChatDrawerPanel />,
  [DrawerPanelType.CONTACT]: <p>TODO: Contact Drawer Panel</p>,
} as const;

const Drawer = () => {
  const currentDrawerPanelType = useAppSelector(selectCurrentDrawerPanelType);

  const dispatch = useAppDispatch();

  const handleCloseDrawerClick = (): void => {
    dispatch(drawerClosed());
  };

  useEscapeListener(handleCloseDrawerClick);

  return (
    <>
      <motion.div
        key="chat-drawer"
        className="fixed right-0 top-0 z-40 flex h-dvh w-full max-w-md flex-col gap-4 bg-white p-4 shadow sm:border-l sm:border-gray-200"
        variants={DrawerSlideIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex justify-end">
          <IconButton
            onClick={handleCloseDrawerClick}
            aria-label="Close Drawer"
            className="p-2"
          >
            <XIcon />
          </IconButton>
        </div>
        {currentDrawerPanelType && drawerPanelMap[currentDrawerPanelType]}
      </motion.div>
      {currentDrawerPanelType && (
        <Backdrop onBackdropClick={handleCloseDrawerClick} />
      )}
    </>
  );
};

export default Drawer;
