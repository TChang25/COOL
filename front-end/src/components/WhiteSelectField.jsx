import React from 'react';
import { TextField } from '@mui/material';

const WhiteSelectField = (props) => {
  return (
    <TextField
      select
      {...props}
      
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "5px",
          backgroundColor: "transparent",
          color: "white",
          textAlign: "left",
          
          "& input": { 
            color: "#fff", 
          },
          "& fieldset": {
              borderColor: "white", 
          },
          "&:hover fieldset": {
              borderColor: "white", 
          },
          "&.Mui-focused fieldset": {
              borderColor: "white", 
          },
          
          "& .MuiSelect-icon": {
              color: "white",
          }
        },
        
        "& .MuiInputLabel-root": {
          color: "#fff",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#fff",
        },
        
        "& .MuiFormHelperText-root": {
           color: "white", 
        },
      }}
    />
  );
};

export default WhiteSelectField;