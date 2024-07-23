import React, { useEffect, useState } from 'react';

import { Auth } from '../components/auth'; 
import { db, auth, storage } from '../config/firebase';
import { 
    getDocs, 
    collection, 
    addDoc, 
    deleteDoc, 
    updateDoc,
    doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import Box from "@mui/material/Box"
// import { UploadFile } from '@mui/icons-material';

const LoginPage: React.FC = () => {
	const [movieList, setMovieList] = useState([]);
    const moviesCollectionRef = collection(db, 'movies');

    //New Movie States
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
    const [newMovieReceivedAnOscar, setNewMovieReceivedAnOscar] = useState(false);	

    // Update Title State
    const [updateMovieTitle, setUpdateMovieTitle] = useState('');

    // File Upload State
    const [fileUpload, setFileUpload] = useState<File | null>(null);

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

    useEffect(() => {
        getMovieList();
    }, []);

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
    
    const onSubmitMovie = async () => {
        try {
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                releaseDate: newMovieReleaseDate,
                receivedAnOscar: newMovieReceivedAnOscar,
                userId: auth?.currentUser?.uid,
            });
            setNewMovieTitle('');
            setNewMovieReleaseDate(0);
            setNewMovieReceivedAnOscar(false);
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
            await uploadBytes(movieImagesRef, fileUpload);
        } catch (err) {
            console.error(err);
        };
    };

	return (
		<>
			<div className="Login">
                <Auth />

                <Box> <br /><br />
                    <input 
                        placeholder='Movie Title'
                        onChange={(e) => setNewMovieTitle(e.target.value)}
                    />
                    <input 
                        placeholder='Release Date' 
                        type='number'
                        onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
                    />
                    <input 
                        type='checkbox' 
                        checked={newMovieReceivedAnOscar}
                        onChange={(e) => setNewMovieReceivedAnOscar(e.target.checked)}
                    />
                    <label>Received an Oscar</label>
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
                                <p> Date: {movie.releaseDate} </p>
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
                </div>
            </div>

		</>
	);
};
export default LoginPage;
