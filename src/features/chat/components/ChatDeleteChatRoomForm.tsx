import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useForm } from 'react-hook-form';

import { useDeleteChatRoomMutation } from '@/features/chatRooms/chatRoomsSlice';
import { deleteChatRoomFormClosed } from '@/features/drawer/drawerSlice';
import { selectedChatIdSet, selectSelectedChatId } from '../chatSlice';

import type { MouseEventHandler } from 'react';

import Form from '@/components/form/Form';
import FormTitle from '@/components/form/FormTitle';
import InputLabel from '@/components/form/InputLabel';
import Button from '@/components/general/Button';
import IconButton from '@/components/general/IconButton';
import XIcon from '@/components/general/XIcon';

type ChatDeleteChatRoomFormProps = { onCloseClick: MouseEventHandler };

const ChatDeleteChatRoomForm = ({
  onCloseClick,
}: ChatDeleteChatRoomFormProps) => {
  const {
    handleSubmit,
    formState: { isLoading },
  } = useForm();

  const selectedChatId = useAppSelector(selectSelectedChatId)!;

  const [deleteChatRoom] = useDeleteChatRoomMutation();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (): Promise<void> => {
    await deleteChatRoom({
      chatRoomId: selectedChatId,
    }).unwrap();
    dispatch(deleteChatRoomFormClosed());
    dispatch(selectedChatIdSet(null));
  };

  const isSubmitDisabled = isLoading;

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-start gap-4 rounded-md bg-white p-8 shadow-md"
    >
      <FormTitle className="flex w-full items-center justify-between">
        <span>Delete chat</span>
        <IconButton
          aria-label="Close Form"
          onClick={onCloseClick}
          className="p-0"
        >
          <XIcon />
        </IconButton>
      </FormTitle>
      <InputLabel>Are you sure you want to delete this chat?</InputLabel>
      <Button
        disabled={isSubmitDisabled}
        className="w-full bg-red-600 hover:bg-red-500"
        type="submit"
      >
        Delete
      </Button>
    </Form>
  );
};

export default ChatDeleteChatRoomForm;
