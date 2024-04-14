import { useAppSelector } from '@/app/hooks';
import { useGetAuthDataQuery } from '@/features/api/apiSlice';
import { selectIsSignedIn } from '@/features/auth/authSlice';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedProps = { children?: ReactNode };

const Protected = ({ children }: ProtectedProps) => {
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const { isFetching, isLoading, isError } = useGetAuthDataQuery();

  if (isError && !isSignedIn) return <Navigate to="/sign-in" />;

  return isLoading || isFetching ? <></> : <>{children}</>;
};

export default Protected;
