import { useGetChatRoomsQuery } from '@/features/chatRooms/chatRoomsSlice';

const useInitHome = () => {
  const { isFetching: isChatRoomsFetching } = useGetChatRoomsQuery();

  const isLoading = isChatRoomsFetching;

  return { isLoading };
};

export default useInitHome;
