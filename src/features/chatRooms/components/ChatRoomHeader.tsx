import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  createChatRoomModalClosed,
  createChatRoomModalOpened,
  selectIsCreateChatRoomModalOpen,
} from '../chatRoomsSlice';

import IconButton from '@/components/general/IconButton';
import { SearchX, UserPlus } from 'lucide-react';
import TextInput from '@/components/form/TextInput';
import MultiSelect from '@/components/general/MultiSelect';

const ChatRoomHeader = () => {
  const isCreateChatRoomOpen = useAppSelector(selectIsCreateChatRoomModalOpen);

  const dispatch = useAppDispatch();

  const handleModalOpen = (): void => {
    dispatch(createChatRoomModalOpened());
  };

  const handleModalClose = (): void => {
    dispatch(createChatRoomModalClosed());
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
