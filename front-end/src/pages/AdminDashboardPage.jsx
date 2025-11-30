import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import DeviceInventory from "../components/DeviceInventory";
import EmployeeManagement from "../components/EmployeeManagement";
import UsageStatistics from "../components/UsageStatistics";
import LoanTable from "../components/LoanTable";

const AdminDashboardPage = () => {
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
        position: "relative", // ✅ so the X button can be positioned absolutely
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

      {/* 🔹 Page Title */}
      <Typography
        variant="h1"
        sx={{
          mb: 4,
        }}
      >
        Admin Dashboard
      </Typography>

      {/* 🔹 Dashboard Components */}
      <Box>
        <LoanTable />
        <DeviceInventory />
        <UsageStatistics />
        <EmployeeManagement />
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
