import React from "react";
import { ActorDetailsProps } from "../../types/interfaces";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const styles = {
  subHeadingText: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    color: "#ffffff",
    textAlign: 'start',
    letterSpacing: 'normal',
    marginBottom: '0',
    fontSize: '1.8em',
    fontWeight: '400',
    fontStyle: 'italic',
    opacity: '.7',
  },
  contentText: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    color: "#ffffff",
    textAlign: 'start',
    letterSpacing: 'normal',
  },
  headerText: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    color: "#ffffff",
    textAlign: "start",
    letterSpacing: 'normal',
    fontSize: "2rem",
    fontWeight: 'bold',
    margin: '10px',
  },
  actorNameText: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    fontSize: '2.8rem',
    color: "#ffffff",
    textAlign: 'start',
    letterSpacing: 'normal',
    width:'100%',
    margin: '0',
    padding: '0',
    fontWeight: 'bold',
    marginTop: '25px',
  },
};

interface ActorDetailsComponentProps {
    actor: ActorDetailsProps;
  }

const ActorDetails: React.FC<ActorDetailsComponentProps> = ({ actor }) => {

    function mapGender(gender: any) {
        switch(gender) {
          case 1:
            return 'Female';
          case 2:
            return 'Male';
          default:
            return 'Not specified';
        }
      }

  return (
    <>
        <Typography variant="h4" component="h3" sx={styles.actorNameText}>
            {actor.name}
        </Typography>
        <Typography variant="h5" component="h3" sx={styles.headerText}>            
            Biography
        </Typography> 
        <Typography variant="h6" component="p" sx={styles.contentText}>
            {actor.biography}
        </Typography>
        <Typography variant="h5" component="h3" sx={styles.headerText}>            
            Personal Info
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="h6" sx={styles.subHeadingText}>KNOWN FOR</Typography>
                <Typography variant="h6" component="p"  sx={styles.contentText}>{actor.known_for_department}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" sx={styles.subHeadingText}>GENDER</Typography>
                <Typography variant="h6" component="p" sx={styles.contentText}>{mapGender(actor.gender)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" sx={styles.subHeadingText}>DATE OF BIRTH</Typography>
                <Typography variant="h6" component="p" sx={styles.contentText}>{actor.birthday}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" sx={styles.subHeadingText}>PLACE OF BIRTH</Typography>
                <Typography variant="h6" component="p" sx={styles.contentText}>{actor.place_of_birth}</Typography>
            </Grid>
        </Grid>
    </>
  );
};

export default ActorDetails;
