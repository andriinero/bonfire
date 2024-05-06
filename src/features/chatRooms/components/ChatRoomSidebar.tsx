import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomList from './ChatsRoomList';

const ChatRoomSidebar = () => {
  return (
    <div className="space-y-4 h-full">
      <ChatRoomHeader />
      <ChatRoomList />
    </div>
  );
};

export default ChatRoomSidebar;
