import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';

import { drawerClosed, selectCurrentDrawerPanelType } from '../drawerSlice';

import { DrawerSlideIn } from '@/styles/animations/SlideIn';
import type { ReactNode } from 'react';
import { DrawerPanelType } from '../types/DrawerPanel';

import Backdrop from '@/components/general/Backdrop';
import { Button } from '@/components/ui/button';
import ChatDrawerPanel from '@/features/chat/components/ChatDrawer';
import { X } from 'lucide-react';

const drawerPanelMap: Record<DrawerPanelType, ReactNode> = {
  [DrawerPanelType.CHAT]: <ChatDrawerPanel />,
  [DrawerPanelType.CONTACT]: <p>TODO: Contact Drawer Panel</p>,
} as const;

const Drawer = () => {
  const currentDrawerPanelType = useAppSelector(selectCurrentDrawerPanelType);
  const dispatch = useAppDispatch();

  const handleCloseDrawerClick = () => {
    dispatch(drawerClosed());
  };

  return (
    <>
      <motion.div
        key="chat-drawer"
        className="fixed right-0 top-0 z-40 flex h-dvh w-full max-w-md flex-col gap-4 bg-white p-4 shadow-md sm:border-l sm:border-gray-200"
        variants={DrawerSlideIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex justify-end">
          <Button
            onClick={handleCloseDrawerClick}
            aria-label="Close Drawer"
            className="p-2"
            variant="ghost"
            size="icon"
          >
            <X />
          </Button>
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
