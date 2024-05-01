import { ReactNode } from 'react';

import { useGetAuthDataQuery } from '@/features/auth/authSlice';

import { Navigate } from 'react-router-dom';
import Paths from '@/constants/Paths';

type ProtectedProps = { children?: ReactNode };

const Protected = ({ children }: ProtectedProps) => {
  const { isFetching, isLoading, isError } = useGetAuthDataQuery();

  if (isError) return <Navigate to={Paths.Auth.SIGN_IN} />;

  return isLoading || isFetching || isError ? <></> : <>{children}</>;
};

export default Protected;
