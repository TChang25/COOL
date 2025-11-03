import React from "react";
import { TextField } from "@mui/material";

const WhiteTextField = (props) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      InputLabelProps={{
        shrink: true, // ✅ label always above
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "5px",
          backgroundColor: "white", // white box
          color: "#2C2C2C", // dark gray input text
          caretColor: "#2C2C2C",

          "& input, & textarea": {
            color: "#2C2C2C", // dark gray inside text
            textAlign: "left", // ensure left-aligned text
          },

          "& fieldset": {
            borderColor: "white", // border
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
          "& .MuiSelect-icon": {
            color: "#2C2C2C", // dropdown arrow
          },
        },

        // ✅ Label always above, white, and left-aligned
        "& .MuiInputLabel-root": {
          color: "white",
          fontWeight: 600,
          fontSize: "1rem",
          transform: "none", // stop floating behavior
          position: "relative", // keep above input
          marginBottom: "4px",
          textAlign: "left", // keep label left-aligned
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white", // stays white when focused
        },

        "& .MuiFormHelperText-root": {
          color: "white", // helper/error text white if needed
        },
      }}
    />
  );
};

export default WhiteTextField;
