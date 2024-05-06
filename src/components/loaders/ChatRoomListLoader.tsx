import ChatRoomItemLoader from "./ChatRoomItemLoader";

const ChatRoomListLoader = () => {
  return (
    <ul className="space-y-4">
      <ChatRoomItemLoader />
      <ChatRoomItemLoader />
      <ChatRoomItemLoader />
      <ChatRoomItemLoader />
      <ChatRoomItemLoader />
    </ul>
  );
};

export default ChatRoomListLoader;
