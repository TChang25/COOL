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
  Typography, // 🟢 ADDED (needed for "No information available")
} from "@mui/material";
import Button from "./Button";
import { devices } from "../data/mockData";
import { useAuth } from "../context/MockAuth";
import { useNavigate } from "react-router-dom";
import ViewModal from "./ViewModal";



const DeviceAvailabilityTable = ({
  selectedCenter = "", // 🟢 Added default values so props never break
  selectedFilter = "All",
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || "Citizen";

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedDevice, setSelectedDevice] = React.useState(null);

  const handleOpenModal = (device) => {
    setSelectedDevice(device);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDevice(null);
  };


  // 🧮 Safe filtering logic
  const filteredDevices = Array.isArray(devices)
    ? devices.filter((device) => {
        const matchesCenter =
          !selectedCenter || device.location === selectedCenter;

        const matchesFilter =
          selectedFilter === "All" ||
          device.status === selectedFilter ||
          device.type === selectedFilter;

        return matchesCenter && matchesFilter;
      })
    : [];

  // ✅ Role-based actions
  const renderActionButton = (device) => {
    if (role !== "Citizen") {
      return (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            varianttype="check"
            onClick={() => {
              console.log("Check In:", device.name)
              navigate('/DeviceCheckIn')
            }}
          >
            Check In
          </Button>
          <Button
            varianttype="check"
            onClick={() => {
              console.log("Check In:", device.name)
              navigate('/DeviceCheckOut')
            }}
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

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#002D72",
          borderRadius: "12px",
          color: "white",
          width: "90%",
          margin: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Device
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Device ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Availability Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device, index) => (
                <TableRow key={device.id || index}>
                  <TableCell sx={{ color: "white" }}>
                    {`${index + 1}. ${device.type}`}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{device.serial}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor:
                          device.status === "Available" ? "#009739" : "#C8102E",
                        color: "white",
                        borderRadius: "12px",
                        textAlign: "center",
                        padding: "4px 0",
                        fontWeight: "bold",
                      }}
                    >
                      {device.status}
                    </Box>
                  </TableCell>
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

      {/* ✅ Modal now rendered inside the component */}
      <ViewModal
        open={openModal}
        onClose={handleCloseModal}
        device={selectedDevice}
      />
    </>
  );

};

export default DeviceAvailabilityTable;
