import { ReactNode } from 'react';
import { useAppSelector } from '@/app/hooks';

import {
  selectIsSignedIn,
  useGetAuthDataQuery,
} from '@/features/auth/authSlice';

import { Navigate } from 'react-router-dom';

type ProtectedProps = { children?: ReactNode };

const Protected = ({ children }: ProtectedProps) => {
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const { isFetching, isLoading, isError } = useGetAuthDataQuery();

  if (isError && !isSignedIn) return <Navigate to="/sign-in" />;

  return isLoading || isFetching ? <></> : <>{children}</>;
};

export default Protected;
