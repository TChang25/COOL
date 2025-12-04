// /src/components/EditUserForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

export default function EditUserForm() {
  const { id } = useParams();
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
    dateOfBirth: "",
    formattedDOB: "", // converted DOB for backend
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -------------------------------------------------
  // Converts MM/DD/YYYY -> YYYY-MM-DD
  // -------------------------------------------------
  function convertDOB(input) {
    if (!input) return "";

    const cleaned = input.replace(/-/g, "/");
    const parts = cleaned.split("/");

    if (parts.length !== 3) return input;

    let [month, day, year] = parts;

    if (year.length === 4 && month && day) {
      if (month.length === 1) month = "0" + month;
      if (day.length === 1) day = "0" + day;

      return `${year}-${month}-${day}`;
    }

    return input;
  }

  const handleDOBChange = (value) => {
    setUser({
      ...user,
      dateOfBirth: value,
      formattedDOB: convertDOB(value),
    });
  };

  // -------------------------------------------------
  // LOAD USER ONCE
  // -------------------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/app-users/${id}`);
        if (!res.ok) throw new Error("User not found");

        const data = await res.json();

        setUser({
          fullName: data.fullName || "",
          email: data.email || "",
          password: "",
          roleId: data.role?.roleId || "",
          streetAddress: data.streetAddress || "",
          city: data.city || "",
          state: data.state || "",
          zipCode: data.zipCode || "",
          contactNumber: data.contactNumber || "",
          dlNum: data.dlNum || "",
          dlState: data.dlState || "",
          dateOfBirth: data.dateOfBirth || "", // raw
          formattedDOB: data.dateOfBirth || "", // backend ready
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // -------------------------------------------------
  // SUBMIT UPDATE
  // -------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: user.fullName,
      email: user.email,
      role: { roleId: Number(user.roleId) },
      streetAddress: user.streetAddress,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      contactNumber: user.contactNumber,
      dlNum: user.dlNum,
      dlState: user.dlState,
      dateOfBirth: user.formattedDOB || null,
    };

    if (user.password.trim() !== "") {
      payload.password = user.password;
    }

    try {
      const res = await fetch(`/api/app-users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update user");

      navigate(-1);
    } catch (err) {
      setError(err.message);
    }
  };

  // -------------------------------------------------
  // UI STATES
  // -------------------------------------------------
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  // -------------------------------------------------
  // FORM UI
  // -------------------------------------------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#8CC8FF",
        display: "flex",
        justifyContent: "center",
        paddingTop: "60px",
      }}
    >
      <Paper sx={{ p: 4, width: "500px" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Edit User
        </Typography>

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
            label="Role ID"
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
            Save Changes
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
