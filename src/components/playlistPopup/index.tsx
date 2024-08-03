import React, { useState } from 'react';
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CreatableSelect from 'react-select/creatable';

interface Option {
    readonly label: string;
    readonly value: string;
  }
  
  const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });
  
  const defaultOptions = [
    createOption('One'),
    createOption('Two'),
    createOption('Three'),
  ];

const PlaylistPopup: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState<Option | null>();

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
        <br /><br /><br /><br />
        <Button aria-describedby={id} variant="contained" 
        style={{ backgroundColor: 'blue', color: 'white' }}
        onClick={handleClick}>
            Open Popover
        </Button>
        <Popover
            // sx={{ p: 10 }}
            style={{ padding: '10px' }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
        >
            <Typography sx={{ p: 4 }}>The content of the Popover.</Typography>
            <CreatableSelect style={{ margin: '10px' }} 
                isMulti 
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(newValue) => setValue(newValue)}
                onCreateOption={handleCreate}
                options={options}
                value={value}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    padding: 10,
                    colors: {
                      ...theme.colors,
                      primary25: 'hotpink',
                      primary: 'black',
                    },
                  })}
                /> 
        </Popover>
        </>
      );
    };
    
    export default PlaylistPopup;