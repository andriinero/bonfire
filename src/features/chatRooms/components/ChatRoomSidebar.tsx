import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomList from './ChatsRoomList';

const ChatRoomSidebar = () => {
  return (
    <div className="grid h-full grid-rows-[auto,1fr] space-y-4">
      <ChatRoomHeader />
      <ChatRoomList />
    </div>
  );
};

export default ChatRoomSidebar;
