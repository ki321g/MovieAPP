import React, { useState, createContext} from "react";
// import fakeAuth from "../fakeAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextInterface } from "../types/interfaces";
import { signOut } from "firebase/auth";
import { auth, googleProvider } from '../config/firebase';

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider:React.FC<React.PropsWithChildren> = (props) => {
  const [token, setToken] = useState<string|null>(null);
  const location = useLocation();
  const navigate = useNavigate();

//   const authenticate = async (username: string, password: string) => {
//     const token = await fakeAuth(username, password);
const authenticate = async (token: string) => {
    setToken(token);
    const origin = location.state?.intent?.pathname || "/";
    navigate(origin);
  };
  
  const signout = async () => {
    try {
        await signOut(auth);
        setToken(null);
        navigate('/')
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        authenticate,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
