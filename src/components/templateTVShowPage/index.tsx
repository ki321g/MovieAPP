import React from "react"; 
//  import TVShowHeader from "../headerTVShow";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTVShowImages } from "../../api/tmdb-api";
import { TvImage, TvShowDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: '100vh',
    },
};

interface TVShowPageTemplateProps {
    tvShow: TvShowDetailsProps;
    children: React.ReactElement;
}


const TVShowPageTemplate: React.FC<TVShowPageTemplateProps> = ({tvShow, children}) => {
    const { data, error, isLoading, isError } = useQuery<TvImage[], Error>(
        ["images", tvShow.id],
        () => getTVShowImages(tvShow.id)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }

    const images = data as TvImage[];

    return (
        <>
            {/* <TVShowHeader {...tvShow} /> */}

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {images.map((image: TvImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TVShowPageTemplate;