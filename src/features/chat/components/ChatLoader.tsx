import Spinner from "@/components/general/Spinner";

const ChatLoader = () => {
  return (
    <div className="row-span-2 flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
};

export default ChatLoader;
