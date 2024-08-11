import React, { useState, MouseEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

// import { useTheme } from "@mui/material/styles";

import { NestedMenuItem } from 'mui-nested-menu';
import { AuthContext } from '../../contexts/authContext';
import { auth } from '../../config/firebase';
// import { Link } from 'react-router-dom';

const styles = {
    title: {
      flexGrow: 1,
      fontWeight: 'bold',
    },
  };


const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const { signout } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const open = Boolean(anchorEl);
  // const theme = useTheme();


  const menuOptions = [
    { label: "Home", path: "/" },
    { 
      label: "Movies", 
      subMenu: [
        { label: "Discover", path: "/movies/discover" },
        { label: "Popular", path: "/movies/popular" },
        { label: "Upcoming", path: "/movies/upcoming" }, 
        { label: "Top Rated", path: "/movies/toprated" }, 
        { label: "Now Playing", path: "/movies/nowplaying" },
      ]
    },
    { 
      label: "TV Shows", 
      subMenu: [
        { label: "Discover", path: "/tv/" },
        { label: "Popular", path: "/tv/popular" }, 
        { label: "Top Rated", path: "/tv/top-rated" }, 
        { label: "Airing Today", path: "/tv/airing-today" }, 
        { label: "On The Air", path: "/tv/on-the-air" },
      ]
    },
  ];

  if (auth.currentUser) {
    menuOptions.push(
      { 
        label: "Playlists", 
        subMenu: [
          { label: "Movie Playlists", path: "/movies/playlists" },
          { label: "TV Playlists", path: "/tv/upcoming" },
        ]
      },
      { label: "Favorites", path: "/movies/favourites" },
      { label: "Fantasy Movie", path: "/fantasymovie" },
    );
  }

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setAnchorEl(null);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (pageURL: string) => {
    navigate(pageURL);
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
                onClick={handleMenu}
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
            >
               {menuOptions.map((option, index) => (
                  option.subMenu ? (
                    <NestedMenuItem label={option.label} parentMenuOpen={true} key={index}>
                      {option.subMenu.map((subOption, subIndex) => (
                        <MenuItem key={subIndex} onClick={() => handleMenuSelect(subOption.path)}>
                          {subOption.label}
                        </MenuItem>
                      ))}
                    </NestedMenuItem>
                  ) : (
                    <MenuItem key={index} onClick={() => handleMenuSelect(option.path)}>
                      {option.label}
                    </MenuItem>
                  )
                ))}
            </Menu>
          <Typography variant="h4" sx={styles.title}>
          </Typography>
          { auth.currentUser ? (
            <Button color="inherit" size="large" sx={{ fontSize: '1.2rem', py: 1, px: 2 }} onClick={() => signout && signout()}>Sign out</Button>
            
          ) : (
              <Button color="inherit" size="large" sx={{ fontSize: '1.2rem', py: 1, px: 2 }} onClick={() => handleClick('/login')}>Login</Button>
          )}
          
          
      </Toolbar>
    </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;