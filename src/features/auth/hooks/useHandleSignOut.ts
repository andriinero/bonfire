import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';

import { signedOut } from '@/features/auth/authSlice';

const useHandleSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = (): void => {
    dispatch(signedOut());
    navigate('/sign-in');
  };

  return handleSignOutClick;
};

export default useHandleSignOut;
