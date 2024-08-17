import React from "react";
import { useQuery } from "react-query";
import { getMovieCast, getTVShowCast } from "../../api/tmdb-api";
import { MovieCastMember } from "../../types/interfaces";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia } from '@mui/material';

const styles = {
    castBox: {
      maxWidth: "100%", 
      overflowX: "auto",
      whiteSpace: "nowrap" as const,
      paddingY: "20px",
      '&::-webkit-scrollbar': {
        width: '1em', 
        height: '1.8em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)',
        borderRadius: '10px', 
        backgroundColor: '#F5F5F5' 
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888', 
        borderRadius: '10px', 
        '&:hover': {
          backgroundColor: '#555', 
        }
      },
    },
    castCard: {
      display: "inline-block",
      margin: "0 10px",
      textAlign: "center" as const,
      cursor: "pointer", 
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0)", 
      transition: "transform 0.3s, box-shadow 0.3s",
      '&:hover': {
        transform: "scale(1.05)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0)",
      },
    },
    castImage: {
      width: "200px",
      height: "250px",
    },
    castName: {
      marginTop: "0px",    
      paddingTop: "0px",
      fontWeight: "bold",
      fontSize: "1.2rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", 
      color: "#fff",
    },
  };

interface CastProps {
  movieId?: number;
  tvShowId?: number;
}

/* CastMembers component
 * This component is used to display the cast members of a movie or TV show
 */
const CastMembers: React.FC<CastProps> = ({ movieId, tvShowId }) => {
    // Determine which fetch function to use based on the presence of a movieId
    const fetchFunction = movieId ? () => getMovieCast(movieId) : () => getTVShowCast(tvShowId!);

    // Get Cast with useQuery
    const { data: castData, error: castError, isLoading: castLoading, isError: isCastError } = useQuery<
    { cast: MovieCastMember[] }, Error>([movieId ? "movieCast" : "tvShowCast", movieId || tvShowId], fetchFunction);	

    if(castLoading) return <div>Loading...</div>;
    if(isCastError) return <div>Error Loading: {castError?.message}</div>;

    const castMembers = castData?.cast || [];  

    return (
        <>
        <Box sx={styles.castBox}>
        {castMembers.filter(castMember => castMember.profile_path).map((castMember) => (
            <Link
            key={castMember.id}
            to={`/actor/${castMember.id}`}
            style={{ textDecoration: 'none' }}
            >
            <Card sx={{ ...styles.castCard, width: 200 }}> {/* Set a fixed width for the Card */}
                <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
                alt={castMember.name}
                style={styles.castImage}
                />
                <CardContent>
                <Typography variant="h6" component="div" sx={styles.castName} > {/* Apply wordWrap style */}
                    {castMember.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ whiteSpace: 'normal', overflow: 'hidden', height: '40px' }}> {/* Apply wordWrap style */}
                    {castMember.character}
                </Typography>
                
                </CardContent>
            </Card>
            </Link>
        ))}
        </Box>
        </>
    );

};

export default CastMembers;