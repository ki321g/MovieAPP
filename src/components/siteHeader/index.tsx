import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NestedMenuItem, NestedDropdown } from 'mui-nested-menu';

const styles = {
    title: {
      flexGrow: 1,
    },
  };
  const useStyles = makeStyles({
    popover: {
      '& .MuiPopover-root': {
        left: 'unset !important',
        right: '100% !important',
      },
    },
  });

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { 
      label: "Movies", 
      subMenu: [
        { label: "Discover", path: "/movies/discover" },
        { label: "Upcoming", path: "/movies/upcoming" },
      ]
    },
    { 
      label: "TV Shows", 
      subMenu: [
        { label: "Discover", path: "/tv/discover" },
        { label: "Upcoming", path: "/tv/upcoming" },
      ]
    },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Option 3", path: "/" },
    { label: "Login", path: "/login" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
        {isMobile ? (
            <>              
			        <IconButton
				        edge="start"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {/* {menuOptions.map((option, index) => (
                <React.Fragment key={index}>
                  <MenuItem onClick={() => handleMenuSelect(option.path)}>
                    {option.label}
                  </MenuItem>
                  {option.subMenu && option.subMenu.map((subOption, subIndex) => (
                    <MenuItem key={subIndex} onClick={() => handleMenuSelect(subOption.path)}>
                      {subOption.label}
                    </MenuItem>
                  ))}
                </React.Fragment>
              ))} */}
               {menuOptions.map((option, index) => (
                  option.subMenu ? (
                    <NestedMenuItem label={option.label} parentMenuOpen={true} key={index} className={classes.popover}>
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
               
            </>
          ) : (
            <>
              {/* {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))} */}
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
            </>
          )}
      </Toolbar>
    </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;