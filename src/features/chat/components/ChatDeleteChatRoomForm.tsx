import { useAppSelector } from '@/app/hooks';

import {
  selectSelectedChatId,
  useDeleteParticipantMutation,
} from '../chatSlice';

import Form from '@/components/form/Form';

const ChatDeleteChatRoomForm = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId)!;
  const [deleteParticipant] = useDeleteParticipantMutation();

  const handleFormSubmit = (): void => {
    deleteParticipant({ chatRoomId: selectedChatId });
  };

  return <Form onSubmit={handleFormSubmit} className=""></Form>;
};

export default ChatDeleteChatRoomForm;
