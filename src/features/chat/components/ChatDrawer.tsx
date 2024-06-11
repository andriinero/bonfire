import { useAppDispatch } from '@/app/hooks';
import { chatDrawerClosed } from '../chatSlice';

import IconButton from '@/components/general/IconButton';
import { FaXmark } from 'react-icons/fa6';

const ChatDrawer = () => {
  const dispatch = useAppDispatch();

  const handleCloseChatDrawerClick = (): void => {
    dispatch(chatDrawerClosed());
  };

  return (
    <div className="absolute right-0 h-full w-full max-w-md bg-white p-4 shadow sm:border-l sm:border-gray-200">
      <div className="flex justify-end">
        <IconButton
          onClick={handleCloseChatDrawerClick}
          aria-label="Close Form"
          className="p-2"
        >
          <FaXmark />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatDrawer;
