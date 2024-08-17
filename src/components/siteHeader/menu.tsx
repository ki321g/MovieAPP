import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import { useNavigate } from "react-router-dom";
import { auth } from '../../config/firebase';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface MenuProps {
    handleDrawerToggle: () => void;
}

const Menu: React.FC<MenuProps> = ({ handleDrawerToggle }) => {
    const navigate = useNavigate();

    const [openSections, setOpenSections] = useState({
        movies: false,
        tvShows: false,
    });

    const handleToggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handleMenuSelect = (pageURL: string) => {
        // Close Drawer
        handleDrawerToggle();
        
        // Loop through the openSections object
        for (let section in openSections) {
            // Use setOpenSections to set each section to false
            setOpenSections(prevState => ({
            ...prevState,
            [section]: false
            }));
        };

        // Navigate to the pageURL
        navigate(pageURL);
    };

    const menuOptions = [
        { label: "Home", path: "/", icon: <HomeIcon /> },
        {
            label: "Movies", icon: <MovieIcon />, onClick: () => handleToggleSection('movies'), children: [
                { label: "Discover", path: "/movies/discover" },
                { label: "Popular", path: "/movies/popular" },
                { label: "Upcoming", path: "/movies/upcoming" }, 
                { label: "Top Rated", path: "/movies/toprated" }, 
                { label: "Now Playing", path: "/movies/nowplaying" },
            ], open: openSections.movies
        },
        {
            label: "TV Shows", icon: <TvIcon />, onClick: () => handleToggleSection('tvShows'), children: [
                { label: "Discover", path: "/tv/" },
                { label: "Popular", path: "/tv/popular" }, 
                { label: "Top Rated", path: "/tv/top-rated" }, 
                { label: "Airing Today", path: "/tv/airing-today" }, 
                { label: "On The Air", path: "/tv/on-the-air" },
            ], open: openSections.tvShows
        },
        ...(auth.currentUser ? [{
            label: "Playlists", path: "/movies/playlists", icon: <PlaylistPlayIcon /> 
        }] : []),
        ...(auth.currentUser ? [{
            label: "Favorites", path: "/movies/favourites", icon: <FavoriteIcon /> 
        }] : []),
        
        ...(auth.currentUser ? [{
            label: "Fantasy Movie", path: "/fantasymovie", icon: <AutoAwesomeIcon /> 
        }] : []),
        
    ];


    return (
        <List>
            {menuOptions.map((opt) => (
                <React.Fragment key={opt.label}>
                    <ListItem
                        onClick={opt.onClick ? opt.onClick : () => handleMenuSelect(opt.path!)}
                        sx={{ cursor: 'pointer', 
                            '&:hover': {
                                backgroundColor: '#141414'
                            },
                         }}
                        aria-expanded={opt.children ? opt.open : undefined}
                    >
                        {opt.icon}
                        <ListItemText primary={opt.label} sx={{ pl: 2, fontWeight: 'bold' }} />
                        {opt.children ? (opt.open ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItem>
                    {opt.children && (
                        <Collapse in={opt.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {opt.children.map((child) => (
                                    <ListItem
                                        key={child.label}
                                        onClick={() => {
                                            handleMenuSelect(child.path);
                                        }}
                                        sx={{ 
                                            cursor: 'pointer', 
                                            pl: 6, 
                                            '&:hover': {
                                                backgroundColor: '#141414'
                                            }
                                        }}
                                    >
                                        <ListItemText primary={child.label} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </React.Fragment>
            ))}
        </List>
    );
};

export default Menu;
