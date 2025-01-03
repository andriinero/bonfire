import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  drawerOpened,
  drawerPanelTypeSet,
} from '@/features/drawer/drawerSlice';
import { selectSelectedChatId, sidebarOpened } from '../chatSlice';

import ChatTitle from '@/components/general/ChatTitle';
import ChatRoomIcon from '@/features/chatRooms/components/ChatRoomIcon';
import { DrawerPanelType } from '@/features/drawer/types/DrawerPanel';
import NotificationMenu from '@/features/notifications/components/NotificationMenu';
import { ChevronLeft, Ellipsis } from 'lucide-react';
import ChatOnlineStatus from './ChatOnlineStatus';
import { Button } from '@/components/ui/button';

const ChatHeader = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId) as string;
  const dispatch = useAppDispatch();

  const handleOpenSidebarClick = () => {
    dispatch(sidebarOpened());
  };

  const handleOpenChatDrawerClick = () => {
    dispatch(drawerPanelTypeSet(DrawerPanelType.CHAT));
    dispatch(drawerOpened());
  };

  return (
    <header className="flex items-center justify-between gap-16 border-b p-3 shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)] sm:p-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={handleOpenSidebarClick}
          aria-label="chat-options"
          className="p-0 text-amber-500 sm:hidden"
          variant="ghost"
          size="icon"
        >
          <ChevronLeft />
        </Button>

        <Button
          onClick={handleOpenChatDrawerClick}
          className="p-0"
          variant="roundedGhost"
        >
          <ChatRoomIcon className="shrink-0" chatRoomId={selectedChatId} />
        </Button>

        <div>
          <ChatTitle chatRoomId={selectedChatId} />
          <p className="text-sm text-gray-500">
            <ChatOnlineStatus chatRoomId={selectedChatId} />
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <NotificationMenu />

        <Button
          onClick={handleOpenChatDrawerClick}
          aria-label="chat-options"
          className="text-amber-500 hover:text-amber-500"
          variant="ghost"
          size="icon"
        >
          <Ellipsis />
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
