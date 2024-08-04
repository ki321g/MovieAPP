import React, { useEffect, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { auth, googleProvider } from '../../config/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { token } = authContext || {};
  const location = useLocation();
  
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
  //     if (user) {
  //       const { userToken } = user.stsTokenManager.accessToken;
  //       setToken(userToken);
  //     } else {
  //       setToken(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [auth]);


  if (!token) {
    return <Navigate to="/login" replace state={{ intent: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;