import { auth, googleProvider } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

import styles from "./styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Auth = () => {

    // const signIn = () => {
    //     signInWithEmailAndPassword(auth, "email", "password")
    //         .then((userCredential) => {
    //             // Signed in 
    //             const user = userCredential.user;
    //             // ...
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //         });
    // }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
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
                <button onClick={logout}> Logout </button>
            </Box>            
        </Box>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        </>
    )
}