// /src/components/DeviceAvailabilityTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Button from "./Button";
import { useAuth } from "../context/MockAuth";
import { useNavigate } from "react-router-dom";
import ViewModal from "./ViewModal";

const DeviceAvailabilityTable = ({
  selectedCenter = "",
  selectedFilter = "All",
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || "Citizen";

  // ------------------------------
  // STATE
  // ------------------------------
  const [devices, setDevices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedDevice, setSelectedDevice] = React.useState(null);

  // ------------------------------
  // MODAL HANDLERS
  // ------------------------------
  const handleOpenModal = (device) => {
    setSelectedDevice(device);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDevice(null);
  };

  // ------------------------------
  // FETCH REAL DEVICES FROM BACKEND
  // ------------------------------
  React.useEffect(() => {
    const loadDevices = async () => {
      try {
        const res = await fetch("/api/devices");

        if (!res.ok) {
          throw new Error("Failed to fetch devices");
        }

        const data = await res.json();
        setDevices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);

  // ------------------------------
  // DELETE DEVICE
  // ------------------------------
  const handleDeleteDevice = async (deviceId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this device?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/devices/${deviceId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete device");

      setDevices((prev) =>
        prev.filter((device) => device.deviceId !== deviceId)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // ------------------------------
  // FILTERING LOGIC (FIXED — SQL STATUS SUPPORT)
  // ------------------------------
  const filteredDevices = devices.filter((device) => {
    const matchesCenter =
      !selectedCenter || device.location?.locationName === selectedCenter;

    const matchesStatus =
      selectedFilter === "All" ||
      device.status?.deviceStatusName === selectedFilter;

    return matchesCenter && matchesStatus;
  });

  // ------------------------------
  // ROLE-BASED ACTION BUTTONS
  // ------------------------------
  const renderActionButton = (device) => {
    if (role !== "Citizen") {
      return (
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* EDIT */}
          <Button varianttype="edit" route={`/devices/edit/${device.deviceId}`}>
            Edit
          </Button>

          {/* DELETE */}
          <Button
            varianttype="delete"
            onClick={() => handleDeleteDevice(device.deviceId)}
          >
            Delete
          </Button>

          {/* CHECK IN */}
          <Button
            varianttype="check"
            onClick={() => navigate("/DeviceCheckIn")}
          >
            Check In
          </Button>

          {/* CHECK OUT */}
          <Button
            varianttype="check"
            onClick={() => navigate("/DeviceCheckOut")}
          >
            Check Out
          </Button>
        </Box>
      );
    }

    return (
      <Button varianttype="view" onClick={() => handleOpenModal(device)}>
        View Information
      </Button>
    );
  };

  // ------------------------------
  // RENDER
  // ------------------------------
  if (loading) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        sx={{ textAlign: "center", color: "red", fontSize: "1.2rem", mt: 4 }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#002D72",
          borderRadius: "12px",
          color: "white",
          width: "90%",
          margin: "10px auto",
          boxShadow: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Device Type
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Serial Number
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device, index) => (
                <TableRow key={device.deviceId || index}>
                  {/* TYPE */}
                  <TableCell sx={{ color: "white" }}>
                    {device.type?.deviceTypeName || "Unknown"}
                  </TableCell>

                  {/* SERIAL */}
                  <TableCell sx={{ color: "white" }}>
                    {device.serialNumber}
                  </TableCell>

                  {/* STATUS */}
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor:
                          device.status?.deviceStatusId === 1
                            ? "#009739"
                            : "#C8102E",
                        color: "white",
                        borderRadius: "12px",
                        textAlign: "center",
                        padding: "4px 0",
                        fontWeight: "bold",
                      }}
                    >
                      {device.status?.deviceStatusName}
                    </Box>
                  </TableCell>

                  {/* ACTION BUTTONS */}
                  <TableCell>{renderActionButton(device)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      textAlign: "center",
                      padding: "20px 0",
                      fontStyle: "italic",
                    }}
                  >
                    No information available.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL */}
      <ViewModal
        open={openModal}
        onClose={handleCloseModal}
        device={selectedDevice}
      />
    </>
  );
};

export default DeviceAvailabilityTable;
