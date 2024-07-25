import React, { useEffect, useState } from 'react';

import { Grid, Paper, Avatar, TextField, Button, Typography, Link, } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import GoogleButton from 'react-google-button'

const LoginTest: React.FC = () => {
    const paperStyle={padding :50,height:'42vh',width:280, margin:"60px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={fontSize: '18px', height: '50px', margin:'8px 0', borderRadius: 0, backgroundColor:'#1bbd7e', }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>SIGN IN</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required sx={{ mb: 2}} />
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
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
                    onClick={() => { console.log('Google button clicked') }} 
                    // style={{ margin: 2 , width: '100%' }}                    
                    style={{ marginTop: '1em', width: '100%' }}
                    />                
            </Paper>
        </Grid>
    )
}

export default LoginTest