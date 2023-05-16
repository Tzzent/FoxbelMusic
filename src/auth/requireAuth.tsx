import {
  useContext,
} from 'react';

import {
  Navigate,
} from 'react-router-dom';

import { AuthCtx } from '../context/AuthCtx';

interface RequireAuthProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactNode | any,
}

export default function RequireAuth({
  children,
}: RequireAuthProps) {
  const auth = useContext(AuthCtx);

  if (!auth?.user) {
    return <Navigate to={'/login'} />
  }

  return children;
}