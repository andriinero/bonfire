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
import Modal from '@/components/general/Modal';
import ChatRoomIcon from '@/features/chatRooms/components/ChatRoomIcon';
import { Trash2, UserPlus } from 'lucide-react';
import ChatAddParticipantForm from './ChatAddParticipantForm';
import ChatDeleteChatRoomForm from './ChatDeleteChatRoomForm';
import ChatOnlineStatus from './ChatOnlineStatus';
import { Button } from '@/components/ui/button';

const ChatDrawerPanel = () => {
  const isDeleteChatRoomFormOpen = useAppSelector(
    selectIsDeleteChatRoomFormOpen,
  );
  const isAddParticipantFormOpen = useAppSelector(
    selectIsAddParticiapntFormOpen,
  );
  const selectedChatId = useAppSelector(selectSelectedChatId)!;
  const dispatch = useAppDispatch();

  const handleAddParticipantFormClick = () => {
    dispatch(addParticipantFormOpened());
  };

  const handleDeleteChatRoomClick = () => {
    dispatch(deleteChatRoomFormOpened());
  };

  const handleCloseAddParticipantForm = () => {
    dispatch(addParticipantFormClosed());
  };

  const handleCloseDeleteChatRoomForm = () => {
    dispatch(deleteChatRoomFormClosed());
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-4 p-4">
        <ChatRoomIcon chatRoomId={selectedChatId} style="xl" />
        <div className="text-center">
          <ChatTitle
            className="text-xl font-semibold"
            chatRoomId={selectedChatId}
          />
          <ChatOnlineStatus chatRoomId={selectedChatId} className="text-sm" />
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <Button
          aria-label="Add Chat Participant"
          onClick={handleAddParticipantFormClick}
          variant="secondary"
          size="icon"
        >
          <UserPlus />
        </Button>
        <Button
          aria-label="Delete Chat"
          onClick={handleDeleteChatRoomClick}
          variant="destructive"
          size="icon"
        >
          <Trash2 />
        </Button>
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
