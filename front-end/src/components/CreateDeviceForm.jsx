import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

export default function CreateDeviceForm() {
  const navigate = useNavigate();

  const [device, setDevice] = useState({
    deviceName: "",
    serialNumber: "",
    deviceTypeId: "",
    deviceStatusId: "",
    locationId: "",
    createdByUserId: "",
  });

  const [error, setError] = useState("");

  // ------------------------------
  // HANDLE INPUT CHANGE
  // ------------------------------
  const handleChange = (e) => {
    setDevice({
      ...device,
      [e.target.name]: e.target.value,
    });
  };

  // ------------------------------
  // SUBMIT CREATE
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert fields into the structure your backend expects:
    const payload = {
      deviceName: device.deviceName,
      serialNumber: device.serialNumber,
      type: { deviceTypeId: Number(device.deviceTypeId) },
      status: { deviceStatusId: Number(device.deviceStatusId) },
      location: { locationId: Number(device.locationId) },
      createdBy: { userId: Number(device.createdByUserId) },
    };

    try {
      const res = await fetch("/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create device");

      navigate("/device");
    } catch (err) {
      setError(err.message);
    }
  };

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <Box
      sx={{
        width: "100vw",
        backgroundColor: "#8CC8FF",
        display: "flex",
        justifyContent: "center",
        paddingTop: "60px",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: "500px",
          textAlign: "center",
          backgroundColor: "#002D72",
          color: "white",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Add New Device
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          {/* Device Name */}
          <TextField
            label="Device Name"
            name="deviceName"
            value={device.deviceName}
            onChange={handleChange}
            fullWidth
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
            required
          />

          {/* Serial Number */}
          <TextField
            label="Serial Number"
            name="serialNumber"
            value={device.serialNumber}
            onChange={handleChange}
            fullWidth
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
            required
          />

          {/* Device Type ID */}
          <TextField
            label="Device Type ID"
            name="deviceTypeId"
            value={device.deviceTypeId}
            onChange={handleChange}
            fullWidth
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
            required
          />

          {/* Device Status ID */}
          <TextField
            label="Device Status ID"
            name="deviceStatusId"
            value={device.deviceStatusId}
            onChange={handleChange}
            fullWidth
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
            required
          />

          {/* Location ID */}
          <TextField
            label="Location ID"
            name="locationId"
            value={device.locationId}
            onChange={handleChange}
            fullWidth
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
            required
          />

          {/* Created By User ID */}
          <TextField
            label="Created By User ID"
            name="createdByUserId"
            value={device.createdByUserId}
            onChange={handleChange}
            fullWidth
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
            required
          />

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Create Device
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, backgroundColor: "white" }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
