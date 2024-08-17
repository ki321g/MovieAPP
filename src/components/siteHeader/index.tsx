import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MovieIcon from "@mui/icons-material/Movie";
import { AuthContext } from '../../contexts/authContext';
import { auth } from '../../config/firebase';
import Drawer from '@mui/material/Drawer';
import SiteMenu from "./menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from 'react-router-dom';

const styles = {
  title: {
    flexGrow: 1,
    fontWeight: 'bold',      
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    fontSize: '3rem',
    background: 'linear-gradient(180deg, #35B8D8, #06203E)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: 'normal',
    margin: '0',
    padding: '0',
  },
  movieIcon: {
    flexGrow: 1,
    fontWeight: 'bold',      
    fontSize: '2rem',    
    margin: '0',
    padding: '0',
  },
  loginOutButtons: {
    fontWeight: '900',      
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    fontSize: '1.6rem',
    marginTop: '8px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '10px',
    paddingRight: '10px',  
    background: 'linear-gradient(180deg, #35B8D8, #06203E)',
    '&:hover': {
        background: 'linear-gradient(90deg, #35B8D8, #06203E)',
    }, 
  }
  };

const drawerWidth = 240;
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { signout } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (pageURL: string) => {
    navigate(pageURL);    
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="secondary">
        <Toolbar>
            <IconButton
				        edge="start"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu} 
                onClick={toggleDrawer} 
                color="inherit"
                size="large"
              >
                <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={() => setAnchorEl(null)}
            />
            
            <Typography variant="h4" sx={styles.title}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                KGMDB <MovieIcon sx={styles.movieIcon} />  
              </Link>
            </Typography>
          { auth.currentUser ? (
            <Button color="inherit" size="large" sx={styles.loginOutButtons} onClick={() => signout && signout()} 
            style={{ backgroundColor: '#282828' }}>Sign out</Button>
            
          ) : (
              <Button color="inherit" size="large" sx={styles.loginOutButtons} onClick={() => handleClick('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
      <Drawer 
        variant={isMobile ? "temporary" : "persistent"}
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: drawerWidth, 
              boxSizing: 'border-box',
              backgroundColor: '#282828', 
            },
        }}
        >
      <SiteMenu
              handleDrawerToggle={toggleDrawer}
            />
      </Drawer>
    </>
  );
};

export default SiteHeader;