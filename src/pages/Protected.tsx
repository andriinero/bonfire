import { useAppSelector } from '@/app/hooks';
import {
  selectAuthDataFetchedState,
  selectIsSignedIn,
} from '@/features/auth/authSlice';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedProps = { children?: ReactNode };

const Protected = ({ children }: ProtectedProps) => {
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const state = useAppSelector(selectAuthDataFetchedState);

  if (state === 'failure' && !isSignedIn) return <Navigate to="/sign-in" />;

  return state === 'loading' ? <></> : <>{children}</>;
};

export default Protected;
