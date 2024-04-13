import { FaPaperPlane } from 'react-icons/fa6';

const MessageBar = () => {
  return (
    <div className="flex items-center gap-4 border-t px-4 py-2">
      <input
        className="flex-1 rounded-full border border-solid border-transparent bg-neutral-100 px-4 py-2 text-neutral-800 outline-0 transition focus:border-solid focus:border-sky-500"
        type="text"
        placeholder="Write a message"
      />
      <div className="cursor-pointer rounded-full bg-sky-500 p-2 text-white transition hover:bg-sky-600">
        <FaPaperPlane />
      </div>
    </div>
  );
};

export default MessageBar;
