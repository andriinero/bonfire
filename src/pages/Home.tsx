import { useAppDispatch, useAppSelector } from '@/app/hooks';
import usePageUnmountNotificationsClear from '@/features/pushNotifications/hooks/usePageNotificationsClear';
import useInitHome from '@/hooks/useInitHome';
import { useEffect } from 'react';

import {
  selectSelectedChatId,
  selectedChatIdSet,
} from '@/features/chat/chatSlice';

import Chat from '@/features/chat/components/Chat';
import ChatLoader from '@/features/chat/components/ChatLoader';
import PushNotificationList from '@/features/pushNotifications/components/PushNotificationList';
import Sidebar from '@/layout/Sidebar';

const Home = () => {
  usePageUnmountNotificationsClear();

  const {
    isSuccess,
    data: { chatRoomsList },
  } = useInitHome();

  const selectedChatId = useAppSelector(selectSelectedChatId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && chatRoomsList!.length > 0)
      dispatch(selectedChatIdSet(chatRoomsList![0]._id));
  }, [isSuccess, chatRoomsList, dispatch]);

  return (
    <div className="grid max-h-dvh grid-cols-[minmax(auto,28rem),1fr] grid-rows-[minmax(5rem,auto),1fr]">
      <Sidebar />
      {selectedChatId ? (
        <Chat selectedChatId={selectedChatId} />
      ) : (
        <ChatLoader />
      )}
      <PushNotificationList />
    </div>
  );
};

export default Home;
