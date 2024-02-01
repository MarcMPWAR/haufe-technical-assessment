import React, { ReactNode } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  element: ReactNode;
  path?: string | string[];
  caseSensitive?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{element}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
