import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';

import { drawerClosed, selectCurrentDrawerPanelType } from '../drawerSlice';

import { DrawerSlideIn } from '@/styles/animations/SlideIn';
import { DrawerPanelType } from '../types/DrawerPanel';

import IconButton from '@/components/general/IconButton';
import XIcon from '@/components/general/XIcon';
import ChatDrawerPanel from '@/features/chat/components/ChatDrawer';

const Drawer = () => {
  const currentDrawerPanelType = useAppSelector(selectCurrentDrawerPanelType);

  const dispatch = useAppDispatch();

  const handleCloseChatDrawer = (): void => {
    dispatch(drawerClosed());
  };

  return (
    <motion.div
      key="chat-drawer"
      className="fixed right-0 top-0 z-10 flex h-dvh w-full max-w-md flex-col gap-4 bg-white p-4 shadow sm:border-l sm:border-gray-200"
      initial={DrawerSlideIn.initial}
      animate={DrawerSlideIn.animate}
      transition={DrawerSlideIn.transition}
    >
      <div className="flex justify-end">
        <IconButton
          onClick={handleCloseChatDrawer}
          aria-label="Close Drawer"
          className="p-2"
        >
          <XIcon />
        </IconButton>
      </div>
      {currentDrawerPanelType === DrawerPanelType.CHAT && <ChatDrawerPanel />}
    </motion.div>
  );
};

export default Drawer;
