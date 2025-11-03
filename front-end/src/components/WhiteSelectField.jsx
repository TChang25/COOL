import React from "react";
import { TextField } from "@mui/material";

const WhiteSelectField = (props) => {
  return (
    <TextField
      select
      variant="outlined"
      InputLabelProps={{
        shrink: true, // keeps label always above
      }}
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "5px",
          backgroundColor: "white", // white box
          color: "#2C2C2C", // dark gray text
          caretColor: "#2C2C2C",
          border: "2px solid rgba(255, 255, 255, 0.6)", // visible border
          transition: "border-color 0.2s ease",

          "& .MuiSelect-select": {
            color: "#2C2C2C", // dark gray text
            textAlign: "left", // ✅ fix: left align selected value
            display: "flex",
            alignItems: "center",
            paddingLeft: "12px", // optional small left padding
          },

          "& input": {
            color: "#2C2C2C",
            textAlign: "left",
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
          "&:hover": {
            border: "2px solid white", // strong hover border
          },
          "&.Mui-focused": {
            border: "2px solid white",
          },
          "& .MuiSelect-icon": {
            color: "#2C2C2C", // dropdown arrow dark gray
          },
        },

        "& .MuiInputLabel-root": {
          color: "white", // label color
          fontWeight: 600,
          fontSize: "1rem",
          transform: "none", // static label
          position: "relative",
          marginBottom: "4px",
          textAlign: "left",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white",
        },

        "& .MuiFormHelperText-root": {
          color: "white",
        },
      }}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            sx: {
              backgroundColor: "white", // white dropdown background
              color: "#2C2C2C", // dark gray text
              border: "2px solid rgba(255,255,255,0.8)", // visible dropdown border
              borderRadius: "5px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
              "& .MuiMenuItem-root": {
                textAlign: "left", // ✅ left align options
                color: "#2C2C2C",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "rgba(0,45,114,0.1)", // subtle hover
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default WhiteSelectField;
