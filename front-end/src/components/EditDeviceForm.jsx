// /src/components/EditDeviceForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

export default function EditDeviceForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState({
    deviceName: "",
    serialNumber: "",
    deviceTypeId: "",
    deviceStatusId: "",
    locationId: "",
    createdByUserId: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------------------------------------
  // FETCH DEVICE BY ID
  // ---------------------------------------------------------
  useEffect(() => {
    const loadDevice = async () => {
      try {
        const res = await fetch(`/api/devices/${id}`);
        if (!res.ok) throw new Error("Device not found");

        const data = await res.json();

        setDevice({
          deviceName: data.deviceName || "",
          serialNumber: data.serialNumber || "",
          deviceTypeId: data.type?.deviceTypeId || "",
          deviceStatusId: data.status?.deviceStatusId || "",
          locationId: data.location?.locationId || "",
          createdByUserId: data.createdBy?.userId || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDevice();
  }, [id]);

  // ---------------------------------------------------------
  // HANDLE INPUT CHANGE
  // ---------------------------------------------------------
  const handleChange = (e) => {
    setDevice({
      ...device,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------------------------------------------------
  // SUBMIT UPDATE
  // ---------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format expected by backend
    const payload = {
      deviceName: device.deviceName,
      serialNumber: device.serialNumber,
      type: { deviceTypeId: Number(device.deviceTypeId) },
      status: { deviceStatusId: Number(device.deviceStatusId) },
      location: { locationId: Number(device.locationId) },
      createdBy: { userId: Number(device.createdByUserId) },
    };

    try {
      const res = await fetch(`/api/devices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update device");

      navigate("/device");
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------------------------------------------------------
  // UI STATES
  // ---------------------------------------------------------
  if (loading) return <Typography>Loading...</Typography>;

  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 3 }}>
        {error}
      </Typography>
    );

  // ---------------------------------------------------------
  // FORM UI
  // ---------------------------------------------------------
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
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
          <Typography variant="h5" sx={{ mb: 2 }}>
            Edit Device
          </Typography>

          <form onSubmit={handleSubmit}>
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Save Changes
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
    </Box>
  );
}
