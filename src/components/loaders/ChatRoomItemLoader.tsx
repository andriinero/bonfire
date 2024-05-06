const ChatRoomItemLoader = () => {
  return (
    <div className="flex animate-pulse gap-4" aria-live="polite">
      <div className="shrink-0">
        <div className="size-12 rounded-full bg-gray-200" />
      </div>
      <div className="flex grow justify-between gap-2">
        <div className="flex flex-col justify-center gap-5">
          <h1 className="min-h-1 max-w-12 rounded-lg bg-gray-200"></h1>
          <p className="min-h-1 min-w-52 rounded-lg bg-gray-200"></p>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomItemLoader;
