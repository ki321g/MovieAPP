import React, {MouseEvent, useContext, useState, useEffect} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {BaseMovieProps, Playlist} from "../../types/interfaces"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreatableSelect from 'react-select/creatable';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Slide, { SlideProps } from '@mui/material/Slide';
import { db, auth } from '../../config/firebase';
import { ref } from 'firebase/storage';
import { 
    getDocs, 
    query, 
    where,
    collection, 
    addDoc, 
    deleteDoc, 
    updateDoc,
    doc 
} from 'firebase/firestore';

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [];

const customStyles = {
    control: (provided) => ({
        ...provided,
        fontSize: '1.5em',
        padding: '6px 8px',
      }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '1.5em',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isFocused ? 'lightgray' : null,
    //   fontSize: state.isSelected ? '1.75em' : '1.25em',
      padding: state.isSelected ? '10px 15px' : '10px 12px',
  
    }),
  };
  
const AddToPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);
  const [alert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<Option[]>([]);
  const [options, setOptions] = useState(defaultOptions);

  const userPlaylistRef = collection(db, 'user_playlists');
  const moviePlaylistRef = collection(db, 'playlists');

  // const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   context.addToPlaylist(movie);
    
  // };

  // useEffect(() => {
  //   console.log('Value');
  //   console.log(value);
  // }, [value]);

  // const handleAlert = () => {
  //   setAlert(true);
  // };

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
        // console.log(inputValue);
        // console.log(value);
        // console.log(newValue);
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
      const filteredMoviePlaylists = moviePlaylists.docs.map((doc) => ({                    
          id: doc.id,
          ...doc.data(),
      }));
      // console.log(moviePlaylists);
      // console.log(filteredMoviePlaylists);

      const latestMoviePlaylists = filteredMoviePlaylists.map(playlist => playlist.playlist_name);
      
      // console.log('latestMoviePlaylists');
      // console.log(latestMoviePlaylists);
      latestMoviePlaylists.forEach(item => {
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
      const filteredUserPlaylists = userPlaylists.docs.map((doc) => ({                    
          id: doc.id,
          ...doc.data(),
      }));
      // console.log('filteredUserPlaylists');
      // console.log(filteredUserPlaylists);
      const latestUserPlaylists = filteredUserPlaylists.map(playlist => playlist.playlist);
      
      // console.log('latestUserPlaylists');
      // console.log(latestUserPlaylists);
      latestUserPlaylists.forEach(item => {
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
        const filteredUserPlaylists = userPlaylists.docs.map((doc) => ({                    
            id: doc.id,
            ...doc.data(),
        }));
        
        const currentuserPlaylists = filteredUserPlaylists.map(playlist => playlist.playlist);
        
        // console.log('currentuserPlaylists');
        // console.log(currentuserPlaylists);

        if (currentuserPlaylists.find(playlist => playlist.toLowerCase() === newPlaylist.toLowerCase())) {
            
          handleAlert("error", "Playlist already exists. Please try a different name.", true);

          } else {
            await addDoc(userPlaylistRef, {
                playlist: newPlaylist,
                userId: auth?.currentUser?.uid,
            });
            // console.log('added');
          };

        // console.log('newPlaylist');
        // console.log(newPlaylist);
        // console.log('updateUserPlaylists');
        // console.log(filteredUserPlaylists);
        
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
    // if(newOpen === false) {
    //     setOpen(newOpen);
    // } else {	
    //     await setOptions(defaultOptions);
    //     await getMoviePlaylists();        
    //     await getUserPlaylists();
    //     setOpen(newOpen);
    // }
    if(newOpen) {
      await setOptions(defaultOptions);
      await getMoviePlaylists();        
      await getUserPlaylists();
    }
    
    setOpen(newOpen);
  };

  const handleUpdate = async () => {
    
    // console.log('Update Function');
    // console.log(JSON.stringify(value, null, 2));
    const result = query(userPlaylistRef, where("userId", "==", auth?.currentUser?.uid));
    const userPlaylists = await getDocs(result);
    const filteredUserPlaylists = userPlaylists.docs.map((doc) => ({                    
        id: doc.id,
        ...doc.data(),
    }));

    const playlists: Playlist[] = [];

    filteredUserPlaylists.forEach(doc => {
      value.forEach(val => {
        if (val.label.includes(doc.playlist)) {
          playlists.push(doc);
        }
      });
    });
      

    // Delete Currtent Playlists for Movie
    const querySnapshot = query(
      moviePlaylistRef, 
      where("userId", "==", auth?.currentUser?.uid),
      where("movie_id", "==", movie.id)
    );
    const queryResults = await getDocs(querySnapshot);
    queryResults.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    // console.log(querySnapshot);
    // console.log(movie.id);
    // console.log(auth?.currentUser?.uid);      
    // console.log(playlists);
    // console.log(movie);

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

    // setAlertSeverity("success"); // or "error", "warning", "info"
    // setAlertMessage("Your message here");
    // setAlert(true);
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
                    onChange={(newValue) => setValue(newValue)}
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
            {/* <Typography 
              sx={{
                fontWeight: 'bold', 
                align: 'center',
                marginTop: '10px',
              }} 
              variant="h4"
            >
              {movie.title.toUpperCase()}
            </Typography> */}
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} style={{ width: '350px',  marginTop: '20px', }} />
          </div>
            
            {/* <Button 
                onClick={async () => await updateUserPlaylists('Kieron')}
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
                TEST
            </Button> */}
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
    {/* <IconButton aria-label="add to playlist" onClick={onUserSelect}> */}
      <IconButton aria-label="add to playlist" onClick={toggleDrawer(true)}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
      </Drawer>  
    </>
  );
};

export default AddToPlaylistIcon;