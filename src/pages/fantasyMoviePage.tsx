import React, { useEffect, useState } from 'react';
import { useQueries } from 'react-query';
import { getGenres } from "../api/tmdb-api";
import { Auth } from '../components/auth'; 
import { db, auth, storage } from '../config/firebase';
import { 
    getDocs, 
    collection, 
    addDoc, 
    deleteDoc, 
    updateDoc,
    doc 
} from 'firebase/firestore';
import { 
    ref, 
    uploadBytes,
    getDownloadURL,
    listAll,
    list, 
} from 'firebase/storage';
import Box from "@mui/material/Box"
import { Button, Grid } from '@mui/material';
import { TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import Spinner from '../components/spinner';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import MovieList from "../components/movieList";
import Movie from "../components/fantasyMovieCard";
import { BaseMovieProps } from '../types/interfaces';

const styles = {
    input: {
      color: '#fff',
    },
    inputLabel: {
        color: '#fff', // Your color for the label
    },
    select: {
      color: '#fff',
      backgroundColor: '#444',
    },
    button: {
      backgroundColor: '#fff',
      color: '#000',
      '&:hover': {
        backgroundColor: '#666',
        color: '#fff',
      },
      fontWeight: 'bold', // Makes the text bold
      fontSize: '1.25rem', // Makes the font larger
      padding: '8px 20px'
    },
    mandatory: {
      color: 'red', // Color to indicate that a field is mandatory
    }
  };


const FantasyMoviePage: React.FC = () => {
	const [movieList, setMovieList] = useState([]);
    const moviesCollectionRef = collection(db, 'movies');
    const [hasRun, setHasRun] = useState(false);
    const [media, setMedia] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    // let url: string;
    //New Movie States
    const [newMovieDate, setNewMovieDate] = React.useState<Dayjs | null>(null);
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newMovieOverview, setNewMovieOverview] = useState<string>('');
    const [newMovieGenre, setNewMovieGenre] = useState<string>('');
    const [newMovieReleaseDate, setNewMovieReleaseDate] = useState<string>('');
    const [newMovieRunTime, setNewMovieRunTime] = useState<string>('');
    const [newMovieProductionCompany, setNewMovieProductionCompany] = useState<string>('');
    const [newMovieReceivedAnOscar, setNewMovieReceivedAnOscar] = useState(false);
    const [newMovieImageUrl, setNewMovieImageUrl] = useState<string>(''); 
    // const [newMovieImageUrl, setNewMovieImageUrl] = useState([]); 
    const [newMovieImageUpload, setNewMovieImageUpload] = useState<File | null>(null);  
    
    const [testWait, setTestWait] = useState(true);

    // Update Title State
    const [updateMovieTitle, setUpdateMovieTitle] = useState('');

    // File Upload State
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [imageUrls, setImageUrls] = useState([]);    
    const allMovieImagesRef = ref(storage, `movieImages/`);

    
            
    

    // console.log(hasRun);
    const [{ data: movieGenresData }] = useQueries([
        {
          queryKey: ['movieGenres'],
          queryFn: getGenres,
          enabled: (media === '' || media === 'movie') && !hasRun, // Only fetch if media is movie or not set and has not run before
        }
      ]);
      
//   const [{ data: movieGenresData }] = useQueries([
//     {
//       queryKey: ['movieGenres'],
//       queryFn: getGenres,
//       enabled: media === '' || media === 'movie', // Only fetch if media is movie or not set
//     }
//   ]);

    const genres = movieGenresData?.genres || [];
    const genreOptions = [{ id: "", name: "Select Genre" }, ...(genres || [])];
    const yearOptions = Array.from({ length: 105 }, (_, i) => 2024 - i);

    const getMovieList = async () => {
        try {
            const movies = await getDocs(moviesCollectionRef);
            const filteredMovies = movies.docs.map((doc) => ({                    
                ...doc.data(),
                id: doc.id,
            }));
            setMovieList(filteredMovies);
        } catch (err) {
            console.error(err);
        };
    };


    const deleteMovie = async (id) => {
        try {
            const movieDoc = doc(db, 'movies', id);
            await deleteDoc(movieDoc);
            getMovieList();
        } catch (err) {
            console.error(err);
        };
    };

    const updateMovie = async (id) => {
        try {
            const movieDoc = doc(db, 'movies', id);
            await updateDoc(movieDoc, { title: updateMovieTitle });
            getMovieList();
        } catch (err) {
            console.error(err);
        };
    };   
    
    const uploadMovieImage = async () => {
        if (!newMovieImageUpload) return;
        // movieImages
        console.log('uploadMovieImage');
        console.log(newMovieImageUpload);

        // Edit File Name
        const fileName = newMovieImageUpload.name.split('.');
        const extension = fileName.pop();
        const tempFileName = fileName.join('.');

        // Get Date Time Format
        const date = new Date();
        const dateTimeFormat = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        console.log(dateTimeFormat);

        // ReCreate File Name
        const newFileName = `${tempFileName}_${dateTimeFormat}.${extension}`;
        const movieImagesRef = ref(storage, `movieImages/${newFileName}`);
        console.log(newFileName);
        
        try {
            // await uploadBytes(movieImagesRef, fileUpload);
            const snapshot = await uploadBytes(movieImagesRef, newMovieImageUpload);
            const url = await getDownloadURL(snapshot.ref);            
            console.log(url);
            setNewMovieImageUrl(url);
            setTestWait(false);
        } catch (err) {
            console.error(err);
        };
    };

    const onSubmitMovie = async () => {
        try {
            const date = newMovieDate.toDate();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                overview: newMovieOverview,
                genre: newMovieGenre,
                // releaseDate: newMovieReleaseDate,
                release_date: formattedDate,
                runtime: newMovieRunTime,
                productionCompany: newMovieProductionCompany,
                receivedAnOscar: newMovieReceivedAnOscar,
                poster_path: 'https://firebasestorage.googleapis.com/v0/b/movieapp-c93cf.appspot.com/o/movieImages%2Fnomovieposter.webp?alt=media&token=d2554b9e-73e3-402b-a332-cfc1ff5e1cbc',
                userId: auth?.currentUser?.uid,
            });
            setNewMovieTitle('');
            setNewMovieOverview('');
            setNewMovieRunTime('');
            setNewMovieProductionCompany('');
            setNewMovieReceivedAnOscar(false);
            setNewMovieImageUrl('');
            getMovieList();
        } catch (err) {
            console.error(err);
        }
    };

    const UploadFile = async () => {
        if (!fileUpload) return;
        // movieImages

        // Edit File Name
        const fileName = fileUpload.name.split('.');
        const extension = fileName.pop();
        const tempFileName = fileName.join('.');

        // Get Date Time Format
        const date = new Date();
        const dateTimeFormat = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        console.log(dateTimeFormat);

        // ReCreate File Name
        const newFileName = `${tempFileName}_${dateTimeFormat}.${extension}`;
        const movieImagesRef = ref(storage, `movieImages/${newFileName}`);
        
        try {
            const snapshot = await uploadBytes(movieImagesRef, fileUpload);
            const url = await getDownloadURL(snapshot.ref);
            setImageUrls((prev) => [...prev, url]);
        } catch (err) {
            console.error(err);
        };
    };
    
    useEffect(() => {
        getMovieList();
        listAll(allMovieImagesRef).then((response) => {
            response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                setImageUrls((prev) => [...prev, url]);
              });
            });
          });
        if (!hasRun) {
            setHasRun(true);
          }
    }, [hasRun]);

	return (
		<>
		<Box>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', paddingBottom: 2 }}>
                        ADD NEW FANTASY MOVIE 
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            sx={styles.input} 
                            label="Movie Title"
                            value={newMovieTitle}
                            onChange={(e) => setNewMovieTitle(e.target.value)}
                            variant="filled"
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#fff' }, 
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            label="Movie Overview"
                            value={newMovieOverview}
                            onChange={(e) => setNewMovieOverview(e.target.value)}
                            variant="filled"
                            fullWidth
                            multiline
                            rows={3}
                            InputLabelProps={{
                                style: { color: '#fff' }, 
                            }}
                        />
                    </Box>                    
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            id="genre-select"
                            fullWidth
                            select
                            value={newMovieGenre}
                            label="Movie Genre"
                            onChange={(e) => setNewMovieGenre(e.target.value)}
                            variant="filled"
                            InputLabelProps={{
                                style: { color: '#fff' }, 
                            }}
                        >
                            {genreOptions.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                                {option.name}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DemoContainer  components={['DatePicker']}>
                                <DatePicker 
                                    label="Movie Release Date"
                                    value={newMovieDate} 
                                    onChange={(newValue) => setNewMovieDate(newValue)}                            
                                    slots={{
                                        openPickerIcon: EditCalendarRoundedIcon,
                                    }}
                                    slotProps={{
                                        openPickerIcon: { fontSize: 'large' },
                                        textField: {
                                        variant: 'filled',
                                        focused: true,
                                        fullWidth: true,
                                        InputLabelProps: {
                                            style: { color: '#fff' },
                                        },
                                        },
                                        
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    {/* <Box sx={{ mb: 2 }}>
                        <TextField
                            id="year-select"
                            fullWidth
                            select
                            value={newMovieReleaseDate}
                            label="Movie Release Year"
                            onChange={(e) => setNewMovieReleaseDate(e.target.value)}
                            variant="filled"
                            InputLabelProps={{
                                style: { color: '#fff' }, 
                            }}
                        >
                            {yearOptions.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Box> */}
                    <Box sx={{ mb: 2 }}>                        
                        <TextField
                            label="Movie Runtime"
                            type="number"
                            value={newMovieRunTime}
                            onChange={(e) => setNewMovieRunTime(Number(e.target.value))}
                            variant="filled"
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#fff' }, 
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            sx={styles.inputLabel} 
                            label="Production Company"
                            value={newMovieProductionCompany}
                            onChange={(e) => setNewMovieProductionCompany(e.target.value)}
                            variant="filled"
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#fff' }, 
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            id="oscar-select"
                            fullWidth
                            select
                            value={newMovieReceivedAnOscar}
                            label="Did Movie Win an Oscar"
                            onChange={(e) => setNewMovieReceivedAnOscar(e.target.value)}
                            variant="filled"
                            InputLabelProps={{
                                style: { color: '#fff' }, 
                            }}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </TextField>
                    </Box>
                    <Box sx={{ mb: 2 }}> 
                        <TextField
                            type="file"
                            label="Movie Image"
                            InputLabelProps={{
                                shrink: true,
                                style: { color: '#fff' }, 
                            }}
                            onChange={(e) => setNewMovieImageUpload(e.target.files?.[0])}
                            variant="filled"
                            fullWidth
                        />
                    </Box>
                    <Button 
                        sx={styles.button} 
                        fullWidth 
                        variant="contained" 
                        onClick={onSubmitMovie}>
                            Submit Movie
                    </Button>
                </Grid>
                <Grid item container spacing={2} xs={9} sx={{ mt: 2 }}>
                    {movieList.map((m) => (
                    <Grid key={m.id} item >
                    <Movie key={m.id} movie={m} 
                        action={(movie: BaseMovieProps) => {
                        return (
                            <></>
                        );
                    }}/>
                </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
		</>
	);
};
export default FantasyMoviePage;
