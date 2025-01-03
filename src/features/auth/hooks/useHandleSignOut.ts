import { useAppDispatch } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';

import { apiSlice } from '@/features/api/apiSlice';
import { signedOut } from '@/features/auth/authSlice';
import { selectedChatIdSet } from '@/features/chat/chatSlice';
import { pushNotificationsListCleared } from '@/features/pushNotifications/pushNotificationsSlice';

const useHandleSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    dispatch(signedOut());
    dispatch(apiSlice.util.resetApiState());
    dispatch(selectedChatIdSet(''));
    dispatch(pushNotificationsListCleared());
    navigate('/sign-in');
  };

  return handleSignOutClick;
};

export default useHandleSignOut;
