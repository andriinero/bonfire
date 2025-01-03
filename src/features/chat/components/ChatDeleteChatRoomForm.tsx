import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useForm } from 'react-hook-form';

import { useDeleteChatRoomMutation } from '@/features/chatRooms/chatRoomsSlice';
import { deleteChatRoomFormClosed } from '@/features/drawer/drawerSlice';
import { selectedChatIdSet, selectSelectedChatId } from '../chatSlice';

import type { MouseEventHandler } from 'react';

import Form from '@/components/form/Form';
import Button from '@/components/general/Button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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

  const handleFormSubmit = async () => {
    await deleteChatRoom({
      chatRoomId: selectedChatId,
    }).unwrap();
    dispatch(deleteChatRoomFormClosed());
    dispatch(selectedChatIdSet(null));
  };

  const isSubmitDisabled = isLoading;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete chat</CardTitle>
        <CardDescription>
          Are you sure you want to delete this chat?
        </CardDescription>
      </CardHeader>
      <Form id="delete-chat-form" onSubmit={handleSubmit(handleFormSubmit)} />
      <CardFooter className="justify-end gap-4">
        <Button aria-label="Close Form" onClick={onCloseClick} style="hollow">
          Cancel
        </Button>
        <Button
          disabled={isSubmitDisabled}
          className="bg-red-600 hover:bg-red-500"
          type="submit"
          form="delete-chat-form"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChatDeleteChatRoomForm;
