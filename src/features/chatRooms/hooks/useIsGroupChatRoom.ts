import useNonAuthParticipants from './useNonAuthParticipants';

const useIsGroupChatRoom = (id: string) => {
  const nonAuthParticipants = useNonAuthParticipants(id);

  if (!nonAuthParticipants) return false;

  return nonAuthParticipants?.length > 1 ? true : false;
};
export default useIsGroupChatRoom;
