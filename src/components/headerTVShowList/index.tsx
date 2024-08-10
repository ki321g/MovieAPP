import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        // marginBottom: 1.5,
        background: "#141414",
        boxShadow: 'none',
        paddingBottom: '20px',
    },
};

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = (headerProps) => {
    const title = headerProps.title
    console.log('Header');
    // console.log('page: ', page);
        // const [page, setPage] = useState(1);)

    return (
        <Paper component="div" sx={styles.root}>            
            <IconButton
                aria-label="go back"
                color="secondary"
            >
                <ArrowBackIcon fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3">
                {title}
            </Typography>
            <IconButton
                aria-label="go forward"
                color="secondary"
            >
                <ArrowForwardIcon fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default Header;