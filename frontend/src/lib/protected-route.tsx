import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth-check';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectPath }) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectPath ?? "/login"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
