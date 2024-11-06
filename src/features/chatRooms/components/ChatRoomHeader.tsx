import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  createChatRoomOpened,
  selectIsCreateChatRoomModalOpen,
} from '../chatRoomsSlice';

import IconButton from '@/components/general/IconButton';
import MultiSelect from '@/components/general/MultiSelect';
import { UserPlus } from 'lucide-react';

const ChatRoomHeader = () => {
  const isCreateChatRoomOpen = useAppSelector(selectIsCreateChatRoomModalOpen);

  const dispatch = useAppDispatch();

  const handleModalOpen = (): void => {
    dispatch(createChatRoomOpened());
  };

  return (
    <div className="flex items-center justify-between gap-16 p-4">
      {isCreateChatRoomOpen ? (
        <>
          <MultiSelect />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <IconButton
            aria-label="Open create chat room form"
            onClick={handleModalOpen}
            style="round"
          >
            <UserPlus />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default ChatRoomHeader;
