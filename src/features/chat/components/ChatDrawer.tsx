import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  addParticipantFormClosed,
  addParticipantFormOpened,
  deleteChatRoomFormClosed,
  deleteChatRoomFormOpened,
  selectIsAddParticiapntFormOpen,
  selectIsDeleteChatRoomFormOpen,
} from '@/features/drawer/drawerSlice';
import { selectSelectedChatId } from '../chatSlice';

import ChatTitle from '@/components/general/ChatTitle';
import IconButton from '@/components/general/IconButton';
import Modal from '@/components/general/Modal';
import ChatRoomIcon from '@/features/chatRooms/components/ChatRoomIcon';
import ChatAddParticipantForm from './ChatAddParticipantForm';
import ChatDeleteChatRoomForm from './ChatDeleteChatRoomForm';
import ChatOnlineStatus from './ChatOnlineStatus';
import { Trash2, UserPlus } from 'lucide-react';

const ChatDrawerPanel = () => {
  const isDeleteChatRoomFormOpen = useAppSelector(
    selectIsDeleteChatRoomFormOpen,
  );
  const isAddParticipantFormOpen = useAppSelector(
    selectIsAddParticiapntFormOpen,
  );
  const selectedChatId = useAppSelector(selectSelectedChatId)!;

  const dispatch = useAppDispatch();

  const handleAddParticipantFormClick = (): void => {
    dispatch(addParticipantFormOpened());
  };

  const handleDeleteChatRoomClick = (): void => {
    dispatch(deleteChatRoomFormOpened());
  };

  const handleCloseAddParticipantForm = (): void => {
    dispatch(addParticipantFormClosed());
  };

  const handleCloseDeleteChatRoomForm = (): void => {
    dispatch(deleteChatRoomFormClosed());
  };

  return (
    <div>
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
          <UserPlus />
        </IconButton>
        <IconButton
          aria-label="Delete Chat"
          className="bg-gray-100 text-red-700"
          onClick={handleDeleteChatRoomClick}
        >
          <Trash2 />
        </IconButton>
      </div>
      <Modal
        isOpen={isAddParticipantFormOpen}
        onBackdropClick={handleCloseAddParticipantForm}
      >
        <ChatAddParticipantForm onCloseClick={handleCloseAddParticipantForm} />
      </Modal>
      <Modal
        isOpen={isDeleteChatRoomFormOpen}
        onBackdropClick={handleCloseDeleteChatRoomForm}
      >
        <ChatDeleteChatRoomForm onCloseClick={handleCloseDeleteChatRoomForm} />
      </Modal>
    </div>
  );
};

export default ChatDrawerPanel;
