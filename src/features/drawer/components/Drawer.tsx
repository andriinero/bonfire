import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';

import { drawerClosed, selectCurrentDrawerPanelType } from '../drawerSlice';

import { DrawerSlideIn } from '@/styles/animations/SlideIn';

import IconButton from '@/components/general/IconButton';
import ChatDrawerPanel from '@/features/chat/components/ChatDrawer';
import { FaXmark } from 'react-icons/fa6';
import { DrawerPanelType } from '../types/DrawerPanel';

const Drawer = () => {
  const currentDrawerPanelType = useAppSelector(selectCurrentDrawerPanelType);

  const dispatch = useAppDispatch();

  const handleCloseChatDrawerClick = (): void => {
    dispatch(drawerClosed());
  };

  return (
    <motion.div
      key="chat-drawer"
      className="absolute right-0 flex h-full w-full max-w-md flex-col gap-4 bg-white p-4 shadow sm:border-l sm:border-gray-200"
      initial={DrawerSlideIn.initial}
      animate={DrawerSlideIn.animate}
      transition={DrawerSlideIn.transition}
    >
      <div className="flex justify-end">
        <IconButton
          onClick={handleCloseChatDrawerClick}
          aria-label="Close Drawer"
          className="p-2"
        >
          <FaXmark />
        </IconButton>
      </div>
      {currentDrawerPanelType === DrawerPanelType.CHAT && <ChatDrawerPanel />}
    </motion.div>
  );
};

export default Drawer;
