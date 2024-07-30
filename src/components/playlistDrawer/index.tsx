import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreatableSelect from 'react-select/creatable';
import { StylesConfig } from 'react-select';
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
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'red',
    }),
  };
  

export default function TemporaryDrawer() {
    const [alert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState<Option[]>([]);
    const moviePlaylistRef = collection(db, 'user_playlists');
    const [options, setOptions] = useState(defaultOptions);

    useEffect(() => {
        console.log('Value');
        console.log(value);
      }, [value]);

      const handleAlert = () => {
        setAlert(true);
      };
      
      const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlert(false);
      };

    const getMoviePlaylist = async () => {
        try {
            const result = query(moviePlaylistRef, where("userId", "==", auth?.currentUser?.uid));
            const moviePlaylists = await getDocs(result);
            const filteredMoviePlaylists = moviePlaylists.docs.map((doc) => ({                    
                id: doc.id,
                ...doc.data(),
            }));
            // console.log('filteredMoviePlaylists');
            // console.log(filteredMoviePlaylists);
            const latestMoviePlaylists = filteredMoviePlaylists.map(playlist => playlist.playlist);
            
            // console.log('latestMoviePlaylists');
            // console.log(latestMoviePlaylists);
            latestMoviePlaylists.forEach(item => {
              handleCreate(item, false);
            });
            
        } catch (err) {
            console.error(err);
        };
    }

    const updateUserPlaylists = async (newPlaylist: string) => {
        try {
            const result = query(moviePlaylistRef, where("userId", "==", auth?.currentUser?.uid));
            const moviePlaylists = await getDocs(result);
            const filteredMoviePlaylists = moviePlaylists.docs.map((doc) => ({                    
                id: doc.id,
                ...doc.data(),
            }));
            
            const currentMoviePlaylists = filteredMoviePlaylists.map(playlist => playlist.playlist);
            
            // console.log('currentMoviePlaylists');
            // console.log(currentMoviePlaylists);

            if (currentMoviePlaylists.find(playlist => playlist.toLowerCase() === newPlaylist.toLowerCase())) {
                console.log('already exists');
                handleAlert();
              } else {
                await addDoc(moviePlaylistRef, {
                    playlist: newPlaylist,
                    userId: auth?.currentUser?.uid,
                });
                // console.log('added');
              };

            // console.log('newPlaylist');
            // console.log(newPlaylist);
            // console.log('updateUserPlaylists');
            // console.log(filteredMoviePlaylists);
            
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
        if(newOpen === false) {
            setOpen(newOpen);
        } else {	
            await setOptions(defaultOptions);
            await getMoviePlaylist();
            setOpen(newOpen);
        }
      };

      const handleUpdate = () => {
        console.log('Update Function');
        console.log(JSON.stringify(options, null, 2));
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
                    This is some content within the card. You can put any content here, such as text, images, or other components.
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
                        theme={(theme) => ({
                            ...theme,
                            padding: 2,
                            colors: {
                            ...theme.colors,
                            primary25: '#807F80',
                            primary: 'black',
                            backgroundColor: 'black',
                            },
                        })}
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
                
                <Button 
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
                </Button>
        </Box>        
        <Snackbar 
             TransitionComponent={SlideTransition}
            open={alert} 
            autoHideDuration={3000} 
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            <Alert onClose={handleAlertClose} variant="filled" severity="error" sx={{ width: '100%' }}>
            {/* <AlertTitle>Error</AlertTitle> */}
                Playlist already exists
            </Alert>
        </Snackbar>
        </>
      );
    
    
    return (
      <>       
       <Button style={{ backgroundColor: 'blue', color: 'white' }} onClick={toggleDrawer(true)}>Open drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>        
        
      </>
    );
}