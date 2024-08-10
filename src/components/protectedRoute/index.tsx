import React, { useEffect, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import Spinner from '../spinner';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  // const authContext = useContext(AuthContext);
  // const { token, loading } = authContext || {};
  const { token, loading } = useContext(AuthContext) || {};

  const location = useLocation();
  // console.log('loading before');
  // console.log(loading);

  if (loading) {
    // console.log('lodgin now');
    return <Spinner />
  }
  
  // console.log('loading after');
  // console.log(loading);
  if (!token) {
    return <Navigate to="/login" replace state={{ intent: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;