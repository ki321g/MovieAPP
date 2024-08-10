import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { TvShowDetailsProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TVShowReviews from '../tvShowReviews'
import ListIcon from "@mui/icons-material/List";
import LayersIcon from "@mui/icons-material/Layers";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chip: {
      color: "#ffffff",
      backgroundColor: "transparent", // Transparent background for the chip items
      margin: "0.5rem",
      border: "2px solid #ffffff",
      fontSize: "1rem",
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: {
        position: "fixed",
        marginTop: 4,
        top: 50,
        right: 2,
    },
};

const TVShowDetails: React.FC<TvShowDetailsProps> = (tvShow) => {

    const [drawerOpen, setDrawerOpen] = useState(false); // New

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tvShow.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvShow.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                {/* <Chip icon={<AccessTimeIcon />} label={`${tvShow.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${tvShow.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${tvShow.vote_average} (${tvShow.vote_count}`}
                />
                <Chip label={`Released: ${tvShow.release_date}`} /> */}
                <Chip
                    icon={<ListIcon />}
                    label={`${tvShow.number_of_episodes} episodes`}
                    sx={styles.chip}
                    />
                <Chip
                    icon={<LayersIcon />}
                    label={`${tvShow.number_of_seasons} seasons`}
                    sx={styles.chip}
                />
                <Chip label={`First Air Date: ${tvShow.first_air_date}`} sx={styles.chip} />
                <Chip label={`Popularity: ${tvShow.popularity}`} sx={styles.chip} />
            </Paper>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <TVShowReviews {...tvShow} />
            </Drawer>
        </>
    );
};
export default TVShowDetails;