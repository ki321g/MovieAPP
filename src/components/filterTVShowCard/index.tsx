import React, { ChangeEvent } from "react";  // useState/useEffect redundant 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FilterOption, GenreData  } from '../../types/interfaces';
import { SelectChangeEvent } from '@mui/material';
import { getTVShowGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Box from '@mui/material/Box';

const styles = {
	root: {
		maxWidth: 280,
	},
	formControl: {
		margin: 1,
		minWidth: 220,
	},
};

interface FilterTVShowsCardProps {
	onUserInput: (f: FilterOption, s: string)  => void; // Add this line
	titleFilter: string;
	genreFilter: string;
  }

/* FilterTVShowCard component
 * This component is used to filter TV shows by title and genre
 */
  const FilterTVShowCard: React.FC<FilterTVShowsCardProps> = ({ titleFilter, genreFilter, onUserInput }) => {
	const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getTVShowGenres);
  
	if (isLoading) {
	  return <Spinner />;
	}
	if (isError) {
	  return <h1>{(error as Error).message}</h1>;
	}
	const genres = data?.genres || [];
	if (genres[0].name !== "All") {
	  genres.unshift({ id: "0", name: "All" });
	}
  
	const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
	  e.preventDefault()
		onUserInput(type, value)
	};
  
	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
	  handleChange(e, "title", e.target.value)
	}
  
	const handleGenreChange = (e: SelectChangeEvent) => {
	  handleChange(e, "genre", e.target.value)
	};

	return (
		<>
			<Card sx={styles.root} variant='outlined'>
				<CardContent>
					<Box >
						<Typography variant='h5' component='h1'>
							<FilterListIcon 
								color="secondary" 
								style={{ fontSize: 40, fontWeight: 'bold' }}
							/>
							FILTER TV SHOWS
						</Typography>
					</Box>
					<TextField
						sx={styles.formControl}
						id='filled-search'
						label='Search field'
						type='search'
						value={titleFilter}
						variant='filled'
						onChange={handleTextChange}
					/>
					<FormControl sx={styles.formControl}>
						<InputLabel id='genre-label'>Genre</InputLabel>
            <Select labelId="genre-label" label="Genre" id="genre-select" value={genreFilter} onChange={handleGenreChange}>
							{genres.map((genre) => {
								return (
									<MenuItem key={genre.id} value={genre.id}>
										{genre.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</CardContent>
			</Card>
		</>
	);
};

export default FilterTVShowCard;
