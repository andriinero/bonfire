import { useGetChatRoomsQuery } from '@/features/chatRooms/chatRoomsSlice';
import { useGetContactsQuery } from '@/features/contacts/contactsSlice';

const useInitHome = () => {
  const {
    isLoading: isChatRoomsLoading,
    isFetching: isChatRoomsFetching,
    isSuccess: isChatRoomsSuccess,
    data: chatRoomsList,
  } = useGetChatRoomsQuery({ page: 0 });
  const {
    isLoading: isContactsLoading,
    isFetching: isContactsFetching,
    isSuccess: isContactsSuccess,
    data: contactsList,
  } = useGetContactsQuery({ page: 0 });

  const isLoading = isChatRoomsLoading || isContactsLoading;
  const isFetching = isChatRoomsFetching || isContactsFetching;
  const isSuccess = isChatRoomsSuccess && isContactsSuccess;
  const data = { chatRoomsList, contactsList };

  return { isLoading, isFetching, isSuccess, data };
};

export default useInitHome;
