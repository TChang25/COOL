import React from 'react';
import { TextField } from '@mui/material';

const WhiteTextField = (props) => {
  return (
    <TextField
      {...props}
      
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "5px",
          backgroundColor: "transparent", 
          
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
          "& textarea": { 
            color: "#fff", 
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
        }
      }}
    />
  );
};

export default WhiteTextField;