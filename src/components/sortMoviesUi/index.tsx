import React, { useState } from "react";
import { Drawer, Fab, Box } from "@mui/material";
import SortMoviesCard from "../sortMoviesCard";


const styles = {
  fab: {
    marginTop: 8,
    position: "fixed",
    borderRadius: "10px",
    top: 20,
    left: 20,
},

};
interface SortMoviesUIProps {
  onSortChange: (sortOption: string) => void;
}

const SortMoviesUI: React.FC<SortMoviesUIProps> = ({ onSortChange }) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("none");

  // Function to handle the sort change
  const handleSortChange = (sortOption: string) => {
    onSortChange(sortOption); 
    setSortOption(sortOption); 
    setSortOpen(false);
  };

  return (
    <>
      <Box>
        <Fab
          color="secondary"
          variant="extended"
          onClick={() => setSortOpen(true)}
          sx={styles.fab}
        >
          Sort
        </Fab>
      </Box>
      <Drawer
        anchor="right"
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        PaperProps={{ sx: { backgroundColor: "#1a1a1a", color: "white" } }}
      >
        <SortMoviesCard sortOption={sortOption} onSortChange={handleSortChange} />
      </Drawer>
    </>
  );
};

export default SortMoviesUI;
