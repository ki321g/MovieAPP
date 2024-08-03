import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import CreatableSelect from 'react-select/creatable';
import { StylesConfig } from 'react-select';

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const colourStyles: StylesConfig<ColourOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: '#0A0A0A' }),
  option: (styles)=> ({ ...styles, backgroundColor: '#0A0A0A' }), 
};


const PlaylistDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<Option | null>();
  const moviePlaylistRef = collection(db, 'user_playlists');
  // const [playlists, setPlaylists] = useState<string[]>([]);  
  const [options, setOptions] = useState(defaultOptions);

  // useEffect(() => {
  //   getMoviePlaylist();
  // }, []);

  const getMoviePlaylist = async () => {
    try {
        const result = query(moviePlaylistRef, where("userId", "==", auth?.currentUser?.uid));
        const moviePlaylists = await getDocs(result);
        const filteredMoviePlaylists = moviePlaylists.docs.map((doc) => ({                    
            id: doc.id,
            ...doc.data(),
        }));
        console.log('filteredMoviePlaylists');
        console.log(filteredMoviePlaylists);
        const latestMoviePlaylists = filteredMoviePlaylists.map(playlist => playlist.playlist);
        
        console.log('latestMoviePlaylists');
        console.log(latestMoviePlaylists);
        // latestMoviePlaylists.map(createOption);
        latestMoviePlaylists.forEach(item => {
          handleCreate(item);
        });
        console.log('options');
        console.log(options);
        
    } catch (err) {
        console.error(err);
    };
}

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };

  const handleClickOpen = async () => {
    await setOptions(defaultOptions);
    await getMoviePlaylist();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Button 
        variant="outlined" 
        onClick={handleClickOpen}
        style={{ backgroundColor: 'blue', color: 'white' }}
      >
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <CreatableSelect 
                // styles={{ 
                //   color: '#0052CC',}} 
                
                styles={colourStyles}
                isMulti 
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(newValue) => setValue(newValue)}
                onCreateOption={handleCreate}
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
          <Typography sx={{ pb: 10 }} gutterBottom>            
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default PlaylistDialog;