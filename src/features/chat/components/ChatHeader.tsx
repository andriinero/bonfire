import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  drawerOpened,
  drawerPanelTypeSet,
} from '@/features/drawer/drawerSlice';
import { selectSelectedChatId, sidebarOpened } from '../chatSlice';

import ChatTitle from '@/components/general/ChatTitle';
import IconButton from '@/components/general/IconButton';
import ChatRoomIcon from '@/features/chatRooms/components/ChatRoomIcon';
import { DrawerPanelType } from '@/features/drawer/types/DrawerPanel';
import { ChevronLeft, Ellipsis } from 'lucide-react';
import ChatOnlineStatus from './ChatOnlineStatus';
import NotificationMenu from '@/features/notifications/components/NotificationMenu';

const ChatHeader = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;

  const dispatch = useAppDispatch();

  const handleOpenSidebarClick = (): void => {
    dispatch(sidebarOpened());
  };

  const handleOpenChatDrawerClick = (): void => {
    dispatch(drawerPanelTypeSet(DrawerPanelType.CHAT));
    dispatch(drawerOpened());
  };

  return (
    <header className="flex items-center justify-between gap-16 border-b p-3 shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)] sm:p-4">
      <div className="flex items-center gap-2">
        <IconButton
          onClick={handleOpenSidebarClick}
          aria-label="chat-options"
          className="p-0 text-amber-500 sm:hidden"
        >
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={handleOpenChatDrawerClick} className="p-0">
          <ChatRoomIcon className="shrink-0" chatRoomId={selectedChatId} />
        </IconButton>
        <div>
          <ChatTitle chatRoomId={selectedChatId} />
          <p className="text-sm text-gray-500">
            <ChatOnlineStatus chatRoomId={selectedChatId} />
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <NotificationMenu />
        <IconButton
          onClick={handleOpenChatDrawerClick}
          aria-label="chat-options"
          className="text-amber-500"
        >
          <Ellipsis />
        </IconButton>
      </div>
    </header>
  );
};

export default ChatHeader;
