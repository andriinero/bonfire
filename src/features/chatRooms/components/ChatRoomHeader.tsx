import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  createChatRoomOpened,
  selectIsCreateChatRoomModalOpen,
} from '../chatRoomsSlice';

import MultiSelect from '@/components/general/MultiSelect';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';

const ChatRoomHeader = () => {
  const isCreateChatRoomOpen = useAppSelector(selectIsCreateChatRoomModalOpen);
  const dispatch = useAppDispatch();

  const handleModalOpen = () => {
    dispatch(createChatRoomOpened());
  };

  return (
    <div className="flex items-center justify-between gap-16 p-4">
      {isCreateChatRoomOpen ? (
        <MultiSelect />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-950">Messages</h1>
          <Button
            aria-label="Open create chat room form"
            onClick={handleModalOpen}
            variant="roundedGhost"
            size="icon"
          >
            <MessageSquarePlus />
          </Button>
        </>
      )}
    </div>
  );
};

export default ChatRoomHeader;
