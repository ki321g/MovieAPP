import React from "react";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from '@mui/material/Typography';
import SortIcon from '@mui/icons-material/Sort';
import Box from '@mui/material/Box';

// Mimicking the visual style and layout of the FilterCard component but on the opposite side of the screen
// const styles = {
//   root: {
//     maxWidth: 345,
//     backgroundColor: "#1a1a1a",
//     color: "white",
//   },
//   formControl: {
//     margin: 1,
//     minWidth: 220,
//     color: "white",
//     backgroundColor: "#1a1a1a",
//     border: '1px solid white',
//   },
// };
const styles = {
	root: {
		maxWidth: 345,
	},

	formControl: {
		margin: 1,
		minWidth: 220,
		// backgroundColor: 'rgb(255, 255, 255)',
	},
};


// The sort movies card props interface (onSortChange function and sortOption string for use in the Select component)
interface SortMoviesCardProps {
  onSortChange: (sortOption: string) => void;
  sortOption: string;
}

// The sort movies card component which takes the onSortChange function and the sortOption string as props
const SortMoviesCard: React.FC<SortMoviesCardProps> = ({ onSortChange, sortOption }) => {
  const handleSortChange = (e: SelectChangeEvent) => {
    onSortChange(e.target.value);
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant='h5' component='h1'>
              <SortIcon 
                color="secondary" 
                style={{ fontSize: 40, fontWeight: 'bold' }}
              />
              SORT MOVIES.
          </Typography>
        </Box>
        
        <FormControl sx={styles.formControl}>
						<InputLabel id='sort-label'>Sort By</InputLabel>
            <Select 
              labelId="sort-label" 
              label="Sort" 
              id="sort-select" 
              defaultValue="None"
              value={sortOption} 
              onChange={handleSortChange}
            >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
						</Select>
					</FormControl>
        {/* <FormControl sx={styles.formControl}>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortOption}
            defaultValue="None"
            onChange={handleSortChange}
            variant="filled"
            sx={{
              backgroundColor: "#1a1a1a", color: "white",
              "& .MuiSelect-icon": {
                color: "white",
              },
            }}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
          </Select>
        </FormControl> */}
      </CardContent>
    </Card>
  );
};

export default SortMoviesCard;
