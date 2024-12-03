import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { APP_ROUTES } from '../constant';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()

  return currentUser ? children : <Navigate to={APP_ROUTES.LOGIN} replace/>;
};

export default PrivateRoute;
