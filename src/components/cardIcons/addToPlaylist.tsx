import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {BaseMovieProps, Playlist, UserPlaylist} from "../../types/interfaces"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreatableSelect from 'react-select/creatable';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import { db, auth } from '../../config/firebase';

import { 
    getDocs, 
    query, 
    where,
    collection, 
    addDoc, 
    deleteDoc, 
} from 'firebase/firestore';

interface Option {
  label: string;
  value: string;
};

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions: Option[] = [];

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        fontSize: '1.5em',
        padding: '6px 8px',
      }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: '1.5em',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isFocused ? 'lightgray' : null,
      padding: state.isSelected ? '10px 15px' : '10px 12px',
  
    }),
  };

/* AddToPlaylistIcon component
 * This component is used to add a movie to the user's playlists
 */
const AddToPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
  const [alert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<Option[]>([]);
  const [options, setOptions] = useState(defaultOptions);

  const userPlaylistRef = collection(db, 'user_playlists');
  const moviePlaylistRef = collection(db, 'playlists');

  const handleAlert = async (severity: "error" | "warning" | "info" | "success", message: string, toggle: boolean) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setAlert(toggle);
  };
  
  const handleAlertClose = () => {
     setAlert(false);
  };

  const handleValueLoad = async (inputValue: string, updateValue: Boolean) => {
      setIsLoading(true);
      setTimeout(async () => {
      setIsLoading(false);
      if(updateValue){
        const newValue = {
          label: inputValue,
          value: inputValue.toLowerCase().replace(/\W/g, '')
        };
        setValue((prev) => [...prev, newValue]);        
      };
    }, 1000);
  };

const getMoviePlaylists = async () => {
    try {
      const result = query(
        moviePlaylistRef, 
        where("userId", "==", auth?.currentUser?.uid),
        where("movie_id", "==", movie.id)
      );
      const moviePlaylists = await getDocs(result);
      const filteredMoviePlaylists: Playlist[] = moviePlaylists.docs.map((doc) => ({
        id: doc.id,
        movie_id: doc.data().movie_id,
        movie_title: doc.data().movie_title,
        playlist_id: doc.data().playlist_id,
        playlist_name: doc.data().playlist_name,
        userId: doc.data().userId,
      }));
      const latestMoviePlaylists: any = filteredMoviePlaylists.map(playlist => playlist.playlist_name);

      latestMoviePlaylists.forEach((item: string) => {
        const found = value.find(val => val.label === item);
        if (!found) {
          handleValueLoad(item, true)
        }
      });
    } catch (err) {
        console.error(err);
    };
}

const getUserPlaylists = async () => {
  try {
      const result = query(userPlaylistRef, where("userId", "==", auth?.currentUser?.uid));
      const userPlaylists = await getDocs(result);
      const filteredUserPlaylists: UserPlaylist[] = userPlaylists.docs.map((doc) => ({
        id: doc.id,
        playlist: doc.data().playlist,
        userId: doc.data().userId,

      }));
      
      const latestUserPlaylists: any = filteredUserPlaylists.map(playlist => playlist.playlist);      
      
      latestUserPlaylists.forEach((item: string) => {
        handleCreate(item, false);
      });
      
  } catch (err) {
      console.error(err);
  };
}

const updateUserPlaylists = async (newPlaylist: string) => {
    try {
        const result = query(userPlaylistRef, where("userId", "==", auth?.currentUser?.uid));
        const userPlaylists = await getDocs(result);
        const filteredUserPlaylists: UserPlaylist[] = userPlaylists.docs.map((doc) => ({
          id: doc.id,
          playlist: doc.data().playlist,
          userId: doc.data().userId,
        }));
        
        const currentuserPlaylists: any = filteredUserPlaylists.map(playlist => playlist.playlist);

        if (currentuserPlaylists.find((playlist: string) => playlist.toLowerCase() === newPlaylist.toLowerCase())) {
            handleAlert("error", "Playlist already exists. Please try a different name.", true);
          } else {
            await addDoc(userPlaylistRef, {
                playlist: newPlaylist,
                userId: auth?.currentUser?.uid,
            });
          };
        
    } catch (err) {
        console.error(err);
    };
}
const handleCreate = async (inputValue: string, updateValue: Boolean) => {
    setIsLoading(true);
     setTimeout(async () => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);          
      
      if(updateValue){
        setValue((prev) => [...prev, newOption]);
        await updateUserPlaylists(inputValue);
      };
    }, 1000);
  };
  
  const handleSelectCreate = (inputValue: string) => {
    handleCreate(inputValue, true);
  };
  

const toggleDrawer = (newOpen: boolean) => async () => {    
    if(newOpen) {
      await setOptions(defaultOptions);
      await getMoviePlaylists();        
      await getUserPlaylists();
    }
    
    setOpen(newOpen);
  };

  const handleUpdate = async () => {
    const result = query(userPlaylistRef, where("userId", "==", auth?.currentUser?.uid));
    const userPlaylists = await getDocs(result);
    const filteredUserPlaylists = userPlaylists.docs.map((doc) => ({                    
        id: doc.id,
        ...doc.data(),
    }));
    
    const playlists: UserPlaylist[] = [];

    filteredUserPlaylists.forEach((doc: any) => {
      value.forEach(val => {
        if (val.label.includes(doc.playlist)) {
          playlists.push(doc);
        }
      });
    });

    // Delete Current Playlists for Movie
    const querySnapshot = query(
      moviePlaylistRef, 
      where("userId", "==", auth?.currentUser?.uid),
      where("movie_id", "==", movie.id)
    );

    const queryResults = await getDocs(querySnapshot);
    queryResults.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    // Add New Playlists for Movie
    for (const playlist of playlists) {
      await addDoc(moviePlaylistRef, {
        movie_id: movie.id,
        movie_title: movie.title,
        playlist_id: playlist.id,
        playlist_name: playlist.playlist, 
        userId: auth?.currentUser?.uid,
      });
    };

    await handleAlert("success", "Playlists Updated Successfully", true);
    
    //close
    setTimeout(async () => {      
      setOpen(false);
    }, 1500);

  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }
const DrawerList = (
    <>
    <Box sx={{ width: 500, p:2 }} role="presentation" >
            <Typography 
                sx={{
                    fontWeight: 'bold', 
                }} 
                variant="h4"
            >
                ADD TO PLAYLIST
            </Typography>
            <Typography  variant="body2" >
                Add this movie to one or more of your playlists. You can create new playlists by typing in the box below.
            </Typography>
            
                <br />
                <CreatableSelect 
                    styles={customStyles}
                    isMulti 
                    isClearable
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={(newValue) => setValue(Array.from(newValue))}
                    onCreateOption={handleSelectCreate}
                    options={options}
                    value={value}
                    /> 
            <Button 
                onClick={handleUpdate}
                sx={{
                    mt:2, 
                    width: 500, 
                    p:1, 
                    color: 'text.primary' , 
                    backgroundColor: 'primary.main',
                    fontWeight: 'bold', 
                    fontSize: '20px', 
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      opacity: 0.8, 
                    },
                  }} 
                    size="large"
            >
                UPDATE
            </Button>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>            

            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} style={{ width: '350px',  marginTop: '20px', }} />
          </div>
    </Box>

    <Snackbar 
        TransitionComponent={SlideTransition}
        open={alert} 
        autoHideDuration={1000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
        <Alert onClose={handleAlertClose} variant="filled" severity={alertSeverity}  sx={{ width: '100%' }}>
          {alertMessage} 
        </Alert>
    </Snackbar>
    </>
  );


  return (
    <>
      <IconButton aria-label="add to playlist" onClick={toggleDrawer(true)}>
        <PlaylistAddIcon 
          color="secondary" 
          style={{ fontSize: 40, fontWeight: 'bold' }}
        />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
      </Drawer>  
    </>
  );
};

export default AddToPlaylistIcon;