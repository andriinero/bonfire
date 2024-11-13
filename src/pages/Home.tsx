import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useInitHome from '@/hooks/useInitHome';
import { useEffect } from 'react';

import {
  selectSelectedChatId,
  selectedChatIdSet,
} from '@/features/chat/chatSlice';

import Chat from '@/features/chat/components/Chat';
import ChatLoader from '@/features/chat/components/ChatLoader';
import Sidebar from '@/layout/Sidebar';

const Home = () => {
  const {
    isSuccess,
    data: { chatRoomsList },
  } = useInitHome();

  const selectedChatId = useAppSelector(selectSelectedChatId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && chatRoomsList!.length > 0)
      dispatch(selectedChatIdSet(chatRoomsList![0].id));
  }, [isSuccess, chatRoomsList, dispatch]);

  return (
    <div className="flex h-dvh flex-col-reverse sm:flex-row">
      <Sidebar />
      {selectedChatId ? (
        <Chat selectedChatId={selectedChatId} />
      ) : (
        <ChatLoader />
      )}
    </div>
  );
};

export default Home;
