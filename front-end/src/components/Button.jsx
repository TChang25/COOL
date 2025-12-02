// /src/components/AppButton.jsx
import React from "react";
import { Button as MUIButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(MUIButton)(({ theme, varianttype }) => ({
  borderRadius: theme.shape.borderRadius,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 500,
  textTransform: "none",
  boxShadow: theme.shadows[1],
  padding: "10px 24px",
  fontSize: "1rem",
  transition: "all 0.3s ease-in-out",

  // Default
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,

  ...(varianttype === "primary" && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: "#005BB5",
    },
    width: "200px",
    height: "100px",
  }),

  ...(varianttype === "submit" && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.primary,
    },
    width: "150px",
    height: "50px",
  }),

  ...(varianttype === "check" && {
    backgroundColor: "#fff",
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: "#B8E0FF",
    },
    width: "130px",
    height: "40px",
  }),

  ...(varianttype === "view" && {
    backgroundColor: "#fff",
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: "#A7D4FF",
    },
    width: "200px",
    height: "40px",
    borderRadius: "0px",
  }),

  ...(varianttype === "sign" && {
    backgroundColor: theme.palette.primary.main,
    border: `3px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    },
    width: "100%",
    height: "40px",
    borderRadius: "10px",
  }),

  ...(varianttype === "nearest" && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.primary,
    },
    width: "220px",
    height: "40px",
  }),
}));

const Button = ({ children, varianttype = "primary", route, onClick, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <StyledButton
      type={type}
      varianttype={varianttype}
      onClick={handleClick}
      disableElevation
    >
      {children}
    </StyledButton>
  );
};

export default Button;
