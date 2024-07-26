import React, { useState, useContext } from "react";
import { AuthContext } from '../../../contexts/authContext';
// import { useHistory } from 'react-router-dom';

import { auth, googleProvider } from '../../../config/firebase';
import { 
        signInWithEmailAndPassword, 
        signInWithPopup,
        signOut, 
    } from "firebase/auth";

import { Grid, Paper, Avatar, TextField, Button, Typography, Link, } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import GoogleButton from 'react-google-button'

export const Auth = () => {
    const authContext = useContext(AuthContext);
    const { authenticate } = authContext || {};
    // const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const paperStyle={padding :50,height:'50vh',width:280, margin:"60px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={fontSize: '18px', height: '50px', margin:'8px 0', borderRadius: 0, backgroundColor:'#1bbd7e', }

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result);
            const token = result.user.stsTokenManager.accessToken;
            authenticate && authenticate(token);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = result.user.stsTokenManager.accessToken;;
            authenticate && authenticate(token);
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
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>SIGN IN</h2>
                </Grid>
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
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={signIn} fullWidth>Sign in</Button>
                <Typography > Don't have an account? &nbsp;
                     <Link href="#" >
                        Sign Up 
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
                    
                    
                <Button type='submit' color='primary' variant="contained" style={{ ...btnstyle, backgroundColor: 'red' }} onClick={logout} fullWidth> Logout </Button>
            </Paper>
        </Grid>
        </>
    )
}