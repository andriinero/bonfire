import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  createChatRoomClosed,
  createChatRoomOpened,
  selectIsCreateChatRoomOpen,
} from '../chatRoomsSlice';

import { FaUserPlus } from 'react-icons/fa6';
import IconButton from '@/components/general/IconButton';
import Modal from '@/components/general/Modal';
import { AnimatePresence } from 'framer-motion';

const ChatRoomHeader = () => {
  const isCreateChatRoomOpen = useAppSelector(selectIsCreateChatRoomOpen);

  const dispatch = useAppDispatch();

  const handleModalOpen = (): void => {
    dispatch(createChatRoomOpened());
  };

  const handleModalClose = (): void => {
    dispatch(createChatRoomClosed());
  };

  return (
    <div className="flex items-center justify-between gap-16">
      <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
      <IconButton onClick={handleModalOpen} style="round">
        <FaUserPlus />
      </IconButton>
      <Modal isOpen={isCreateChatRoomOpen} onModalClick={handleModalClose}>
        <div className="rounded-md bg-white p-4 shadow-md">
          <p className="text-black">Create new chat room!</p>
        </div>
      </Modal>
    </div>
  );
};

export default ChatRoomHeader;
