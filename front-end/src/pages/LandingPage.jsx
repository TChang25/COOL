import React from "react";
import { Box, Typography, Container } from "@mui/material";
import bgImage from "/src/assets/The_City_beautiful.jpg";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItmes: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          width: "50%",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" sx={{ mb: 7 }}>
          Borrow A Laptop, Tablet, or Hotspot
        </Typography>
        <Typography variant="h2" sx={{ mb: 7 }}>
          Check availability at your neighborhood center and get connected
          today.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mb: 7 }}>
          <Button varianttype="primary" route="/device">View Device Availability</Button>
          <Button varianttype="primary" route="/nearest">Find Nearest Center</Button>
        </Box>
        <Link
          to="/signIn"
          style={{
            color: "#2C2C2C",
            fontStyle: "italic",
            textDecoration: "underline",
          }}
        >
          Employee? <b>Login here!</b>
        </Link>
      </Box>
    </Box>
  );
};

export default LandingPage;
