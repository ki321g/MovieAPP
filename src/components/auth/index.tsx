import { auth, googleProvider } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithPopup, signOut } from "firebase/auth";
import React, { useState, useContext } from "react";
import { AuthContext } from '../../contexts/authContext';
import styles from "./styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// export const Auth = () => {
export const Auth: React.FC = () => {
    const authContext = useContext(AuthContext);
    const { authenticate } = authContext || {};
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    
    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
                        const result = await signInWithEmailAndPassword(auth, email, password);
            const token = result.user.accessToken;
            authenticate && authenticate(token);
        } catch (err) {
            console.error(err);
        }
    };

    const signUp = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);            
            const token = result.user.accessToken;
            authenticate && authenticate(token);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);            
            const token = result.user.accessToken;
            authenticate && authenticate(token);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setToken(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">Login</Typography>
            <input 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder="Password" 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Box >
                <button onClick={signIn}> Login </button>
                <button onClick={signUp}> Signup </button>
                <button onClick={logout}> Logout </button>
            </Box>            
        </Box>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        </>
    )
}