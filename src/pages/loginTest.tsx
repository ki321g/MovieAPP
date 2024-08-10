import React, { useEffect, useState } from 'react';

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
// import { UploadFile } from '@mui/icons-material';

const LoginTestL: React.FC = () => {
	const [movieList, setMovieList] = useState([]);
    const moviesCollectionRef = collection(db, 'movies');

    //New Movie States
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newMovieOverview, setNewMovieOverview] = useState<string>('');
    const [newMovieGenre, setNewMovieGenre] = useState<string>('');
    const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
    const [newMovieRunTime, setNewMovieRunTime] = useState(0);
    const [newMovieProductionCompany, setNewMovieProductionCompany] = useState<string>('');
    const [newMovieReceivedAnOscar, setNewMovieReceivedAnOscar] = useState(false);
    const [newMovieImageUrl, setNewMovieImageUrl] = useState<string>(''); 
    // const [newMovieImageUrl, setNewMovieImageUrl] = useState([]); 
    const [newMovieImageUpload, setNewMovieImageUpload] = useState<File | null>(null);  


    // Update Title State
    const [updateMovieTitle, setUpdateMovieTitle] = useState('');

    // File Upload State
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [imageUrls, setImageUrls] = useState([]);    
    const allMovieImagesRef = ref(storage, `movieImages/`);

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
        
        try {
            // await uploadBytes(movieImagesRef, fileUpload);
            const snapshot = await uploadBytes(movieImagesRef, newMovieImageUpload);
            const url = await getDownloadURL(snapshot.ref);
            console.log(url);
            setNewMovieImageUrl(url);
            console.log(newMovieImageUrl);
        } catch (err) {
            console.error(err);
        };
    };

    const onSubmitMovie = async () => {
        try {
            await uploadMovieImage();
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                overview: newMovieOverview,
                genre: newMovieGenre,
                releaseDate: newMovieReleaseDate,
                runTime: newMovieRunTime,
                productionCompany: newMovieProductionCompany,
                receivedAnOscar: newMovieReceivedAnOscar,
                imageURL: newMovieImageUrl,
                userId: auth?.currentUser?.uid,
            });
            setNewMovieTitle('');
            setNewMovieOverview('');
            setNewMovieGenre('');
            setNewMovieReleaseDate(0);
            setNewMovieRunTime(0);
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
            // await uploadBytes(movieImagesRef, fileUpload);
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
    }, []);

	return (
		<>
			<div className="Login">
                <Auth />

                <Box> <br /><br />
                    <input 
                        placeholder='Title'
                        onChange={(e) => setNewMovieTitle(e.target.value)}
                    />
                    <input 
                        placeholder='Overview'
                        onChange={(e) => setNewMovieOverview(e.target.value)}
                    />
                    <input 
                        placeholder='Genres'
                        onChange={(e) => setNewMovieGenre(e.target.value)}
                    />
                    <input 
                        placeholder='Release Date' 
                        type='number'
                        onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
                    />
                    <input 
                        placeholder='Run Time' 
                        type='number'
                        onChange={(e) => setNewMovieRunTime(Number(e.target.value))}
                    />
                    <input 
                        placeholder='Production Company'
                        onChange={(e) => setNewMovieProductionCompany(e.target.value)}
                    />
                    <input 
                        type='checkbox' 
                        checked={newMovieReceivedAnOscar}
                        onChange={(e) => setNewMovieReceivedAnOscar(e.target.checked)}
                    />
                    <label>Received an Oscar</label>                    
                    <input 
                        type='file'
                        onChange={(e) => setNewMovieImageUpload(e.target.files?.[0])}
                        accept='image/*'
                    />
                    <br />
                    <button onClick={onSubmitMovie}>Submit Movie </button>

                </Box>

                <div>
                    <h1>Movie List</h1>
                        {movieList.map((movie) => (
                            <div key={movie.id}>
                                <h2 style={{color: movie.receivedAnOscar ? 'green' : 'red'}}> 
                                    {movie.title} 
                                </h2>
                                <p>Overview: {movie.overview}</p>
                                <p>Genre: {movie.genre}</p>
                                <p> Date: {movie.releaseDate} </p>
                                <p> RunTime: {movie.runTime} </p>
                                <p> production company: {movie.productionCompany} </p>
                                <p>imageURL: {movie.imageURL}</p>
                                <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

                                <input 
                                    placeholder='Movie Title' 
                                    onChange={(e) => setUpdateMovieTitle(e.target.value)}
                                />
                                <button onClick={() => updateMovie(movie.id)}> Update Movie Title </button>
                            </div>
                        ))}
                </div>

                <div><br/><br/>
                    <input 
                        type='file'
                        onChange={(e) => setFileUpload(e.target.files?.[0])}
                        accept='image/*'
                    />
                    <button onClick={UploadFile}> Upload Image </button>
                    
                    <br /><br />
                    {imageUrls.map((url) => {
                        return <img src={url} />;
                    })}
                </div>
            </div>

		</>
	);
};
export default LoginTestL;
