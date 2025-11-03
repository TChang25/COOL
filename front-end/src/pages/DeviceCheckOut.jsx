import React from "react";
import DeviceCheckInOut from "../components/DeviceCheckInOut";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const DeviceCheckIn = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#8CC8FF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
        position: "relative",
      }}
    >
      {/* 🔹 X Button (top-right corner) */}
      <IconButton
        onClick={() => navigate(-1)} // ✅ go back to previous page
        sx={{
          position: "absolute",
          top: 50,
          right: 100,
          backgroundColor: "white",
          color: "#2C2C2C",
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
      >
        <CloseIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <DeviceCheckInOut checkType="OUT" />
    </Box>
  );
};

export default DeviceCheckIn;
