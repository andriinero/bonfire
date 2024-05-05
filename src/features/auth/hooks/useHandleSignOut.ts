import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';

import { apiSlice } from '@/features/api/apiSlice';
import { signedOut } from '@/features/auth/authSlice';
import { selectedChatIdSet } from '@/features/chat/chatSlice';

const useHandleSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = (): void => {
    dispatch(signedOut());
    dispatch(apiSlice.util.resetApiState());
    dispatch(selectedChatIdSet(''));
    navigate('/sign-in');
  };

  return handleSignOutClick;
};

export default useHandleSignOut;
