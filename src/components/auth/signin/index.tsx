import React, { useState, useContext } from "react";
import { AuthContext } from '../../../contexts/authContext';
// import { useHistory } from 'react-router-dom';

import { MoviesContext } from "../../../contexts/moviesContext";
import { auth, googleProvider } from '../../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { Grid, Paper, Avatar, TextField, Button, Typography, Link, } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import GoogleButton from 'react-google-button'
import { Alert } from '@mui/material'; 

export const Auth = () => {
    const authContext = useContext(AuthContext);
    const { authenticate } = authContext || {};
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState<string | null>('logIn');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { clearFavourites } = useContext(MoviesContext);


    const paperStyle={padding :50,height:'50vh',width:280, margin:"60px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={fontSize: '18px', height: '50px', margin:'8px 0', borderRadius: 0, backgroundColor:'#1bbd7e', };

    const signIn = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            if (authenticate) {
                await authenticate();
            };
            setErrorMessage(null); 
        } catch (err) {            
            setErrorMessage("Email or Password Incorrect Please Try Again");
            console.error(err);
        }
    };
    

    const signUp = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);            
            if (authenticate) {
                await authenticate();
            };
            setErrorMessage(null); 
        } catch (err) {
            console.error(err);  
            console.error(err.message);
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                // alert('email-already-in-use');                
                setErrorMessage("Email already in use.");
                // setErrorMessage('Email already in use.');
            }           
            
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            if (authenticate) {
                await authenticate();
            };
            setErrorMessage(null); 
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            clearFavourites(); // Clear the favourites
        } catch (err) {
            console.error(err);
        }
    };

    const handleActionChange = () => {
        setAction(action === 'logIn' ? 'signUp' : 'logIn');
        setErrorMessage(null); 
    };

    const handleSubmit = async () => {
        if (action === 'logIn') {
            await signIn();
        } else {
            await signUp();
        }
    };

    return (
        <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>
                     {action === 'signUp' ? 'SIGN UP' : 'SIGN IN'}
                    </h2>                    
                </Grid>
                {action === 'logIn' && errorMessage && (
                            <Alert severity="error" sx={{ mb: 1 }}>
                                {errorMessage}
                            </Alert>
                        )}
                <TextField 
                    label='Email' 
                    variant="outlined" 
                    fullWidth 
                    required 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2}} 
                />
                <TextField 
                    label='Password' 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    type='password' 
                    variant="outlined" 
                    fullWidth required
                />                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSubmit} fullWidth>
                    {action === 'signUp' ? 'Sign Up' : 'Sign In'}
                </Button>
                <Typography > 
                    {action === 'signUp' ? 'Already have an account? ' : 'Dont have an account? '}
                    <Link 
                        href="#" 
                        style={{ 
                            color: '#CC90D7', 
                            fontWeight: 'bold',
                            // borderBottom: '1px solid #CC90D7' 
                        }} 
                        onClick={handleActionChange} 
                    >
                        {action === 'signUp' ? 'Login' : 'Sign Up '}
                    </Link>
                </Typography>
                {/* Sign in with google */}                
                {/* https://www.npmjs.com/package/react-google-button */}
                <GoogleButton
                    // label='Be Cool'
                    // type="dark" // can be light or dark
                    onClick={signInWithGoogle}
                    // style={{ margin: 2 , width: '100%' }}                    
                    style={{ marginTop: '1em', width: '100%' }}
                    />
                {/* <Button type='submit' color='primary' variant="contained" style={{ ...btnstyle, backgroundColor: 'red' }} onClick={logout} fullWidth> Logout </Button> */}
            </Paper>
        </Grid>
        </>
    )
}