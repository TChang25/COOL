// /src/components/CreateUserForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

export default function CreateUserForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    roleId: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    contactNumber: "",
    dlNum: "",
    dlState: "",
    dateOfBirth: "", // raw text user typed
    formattedDOB: "", // auto formatted DOB for backend
  });

  const [error, setError] = useState("");

  // --------------------------------------
  // Convert MM/DD/YYYY -> YYYY-MM-DD
  // --------------------------------------
  function convertDOB(input) {
    if (!input) return "";

    // Normalize separators
    const cleaned = input.replace(/-/g, "/");

    const parts = cleaned.split("/");
    if (parts.length !== 3) return input;

    let [month, day, year] = parts;

    // only valid if year entered fully
    if (year.length === 4 && month && day) {
      if (month.length === 1) month = "0" + month;
      if (day.length === 1) day = "0" + day;

      return `${year}-${month}-${day}`;
    }

    return input;
  }

  // --------------------------------------
  // Handle normal text fields
  // --------------------------------------
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // --------------------------------------
  // Handle DOB separately (auto-convert)
  // --------------------------------------
  const handleDOBChange = (value) => {
    setUser({
      ...user,
      dateOfBirth: value, // what user types
      formattedDOB: convertDOB(value), // what backend expects
    });
  };

  // -----------------------------------------
  // CREATE USER
  // -----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      role: { roleId: Number(user.roleId) },
      streetAddress: user.streetAddress,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      contactNumber: user.contactNumber,
      dlNum: user.dlNum,
      dlState: user.dlState,
      dateOfBirth: user.formattedDOB || null, // <-- FIXED
    };

    try {
      const res = await fetch("/api/app-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create user");

      navigate(-1);
    } catch (err) {
      setError(err.message);
    }
  };

  // -----------------------------------------
  // UI
  // -----------------------------------------
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
      }}
    >
      <Paper sx={{ p: 4, width: "500px", textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Create New User
        </Typography>

        {error && (
          <Typography sx={{ color: "error.main", mb: 2 }}>{error}</Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Full Name"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Role ID (1,2,3)"
            name="roleId"
            value={user.roleId}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Street Address"
            name="streetAddress"
            value={user.streetAddress}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="City"
            name="city"
            value={user.city}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="State"
            name="state"
            value={user.state}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Zip Code"
            name="zipCode"
            value={user.zipCode}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Contact Number"
            name="contactNumber"
            value={user.contactNumber}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="DL Number"
            name="dlNum"
            value={user.dlNum}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="DL State"
            name="dlState"
            value={user.dlState}
            onChange={handleChange}
          />

          {/* UPDATED DOB FIELD */}
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Date of Birth (MM/DD/YYYY)"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={(e) => handleDOBChange(e.target.value)}
            placeholder="MM/DD/YYYY"
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Create User
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
