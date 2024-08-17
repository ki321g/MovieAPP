import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import Spinner from '../spinner';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token, loading } = useContext(AuthContext) || {};

  const location = useLocation();

  if (loading) {
    return <Spinner />
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ intent: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;