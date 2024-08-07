import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  createChatRoomModalClosed,
  createChatRoomModalOpened,
  selectIsCreateChatRoomModalOpen,
} from '../chatRoomsSlice';

import IconButton from '@/components/general/IconButton';
import Modal from '@/components/general/Modal';
import { UserPlus } from 'lucide-react';
import CreateChatRoomForm from './CreateChatRoomForm';

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
      <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
      <IconButton
        aria-label="Open create chat room form"
        onClick={handleModalOpen}
        style="round"
      >
        <UserPlus />
      </IconButton>
      <Modal isOpen={isCreateChatRoomOpen} onBackdropClick={handleModalClose}>
        <CreateChatRoomForm onCloseClick={handleModalClose} />
      </Modal>
    </div>
  );
};

export default ChatRoomHeader;
