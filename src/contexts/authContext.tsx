import React, { useEffect, useState, createContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextInterface } from "../types/interfaces";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from '../config/firebase';
import { signOut } from "firebase/auth";

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider:React.FC<React.PropsWithChildren> = (props) => {  
  const [user, setUser] = useState<any|null>(null);
  const [token, setToken] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const setAuthState = async () => {
    try { 
      if (auth?.currentUser) {
        const userToken = await auth.currentUser.getIdToken(); // Get ID token
        setToken(userToken); // Set token
        setUser(auth?.currentUser); // Set user information
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error('Failed to Set Authentication State:', (err as Error).message);
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false); 
    }
  };

  const authenticate = async () => {
        await setAuthState();

        const origin = location.state?.intent?.pathname || "/";
        navigate(origin);
  };
  
  const signout = async () => {
    try {
        await signOut(auth);        
        setUser(null);
        setToken(null);
        navigate('/')
    } catch (err) {
        console.error(err);
    }
  };

  useEffect(() => {
    
    const awaitStateChange = async () => {
      await setAuthState();
      
      // 
      const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
        if (user) {
          const token = await user.getIdToken(); // Get token
          localStorage.setItem('token', token); // Store token in localStorage
          setToken(token); // Update token
          setUser(user); // Update user information
        } else {
          localStorage.removeItem('token'); // Remove token from localStorage
          setToken(null);
          setUser(null);
        }
      });

      return () => unsubscribe();
    };

    awaitStateChange();
    }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authenticate,
        signout,
        loading, 
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
