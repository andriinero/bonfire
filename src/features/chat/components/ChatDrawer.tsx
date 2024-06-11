import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { motion } from 'framer-motion';
import {
  addParticipantFormClosed,
  addParticipantFormOpened,
  chatDrawerClosed,
  selectIsAddParticiapntFormOpen,
  selectSelectedChatId,
} from '../chatSlice';

import { DrawerSlideIn } from '@/styles/animations/SlideIn';

import ChatTitle from '@/components/general/ChatTitle';
import IconButton from '@/components/general/IconButton';
import Modal from '@/components/general/Modal';
import ChatRoomIcon from '@/features/chatRooms/components/ChatRoomIcon';
import { FaTrash, FaUserPlus, FaXmark } from 'react-icons/fa6';
import ChatOnlineStatus from './ChatOnlineStatus';
import ChatAddParticipantForm from './ChatAddParticipantForm';

const ChatDrawer = () => {
  const isAddParticipantFormOpen = useAppSelector(
    selectIsAddParticiapntFormOpen,
  );
  const selectedChatId = useAppSelector(selectSelectedChatId)!;

  const dispatch = useAppDispatch();

  const handleCloseChatDrawerClick = (): void => {
    dispatch(chatDrawerClosed());
  };

  const handleAddParticipantFormClick = (): void => {
    dispatch(addParticipantFormOpened());
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
      <div className="flex flex-col items-center gap-4 p-4">
        <ChatRoomIcon chatRoomId={selectedChatId} style="xl" />
        <div className="text-center">
          <ChatTitle
            className="text-2xl font-semibold"
            chatRoomId={selectedChatId}
          />
          <ChatOnlineStatus chatRoomId={selectedChatId} className="text-sm" />
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <IconButton
          aria-label="Add Chat Participant"
          className="bg-gray-100"
          onClick={handleAddParticipantFormClick}
        >
          <FaUserPlus size="1rem" />
        </IconButton>
        <IconButton
          aria-label="Delete Chat"
          className="bg-gray-100 text-red-700"
        >
          <FaTrash size="1rem" />
        </IconButton>
      </div>
      <Modal
        isOpen={isAddParticipantFormOpen}
        onModalClick={() => {
          dispatch(addParticipantFormClosed());
        }}
      >
        <ChatAddParticipantForm />
      </Modal>
    </motion.div>
  );
};

export default ChatDrawer;
