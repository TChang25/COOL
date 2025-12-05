import React from "react";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import Button from "./Button";

const ViewModal = ({ open, onClose, device }) => {

const statusLookup = {
  1: "Available",
  2: "Loaned",
  3: "Maintenance",
  4: "Retired",
  5: "Lost",
};


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="device-info-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <Card
        sx={{
          width: 400,
          bgcolor: "#002D72",
          color: "white",
          borderRadius: "16px",
          boxShadow: 10,
          outline: "none",
        }}
      >
        <CardContent>
          {device ? (
            <>
              <Typography
                id="device-info-title"
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  textAlign: "center",
                  color: "white",
                }}
              >
                {device.deviceName}
              </Typography>

              <Divider sx={{ bgcolor: "white", mb: 2 }} />

              <Typography sx={{ color: "white" }}>
                <strong>Type:</strong> {device.type?.deviceTypeName || "N/A"}
              </Typography>

              <Typography sx={{ color: "white" }}>
                <strong>Serial Number:</strong> {device.serialNumber}
              </Typography>

              <Typography sx={{ color: "white" }}>
                <strong>Status: </strong> 
                {device.status?.deviceStatusName ||
                  statusLookup[device.status?.deviceStatusId] ||
                  "Unknown"}
              </Typography>

              <Typography sx={{ color: "white" }}>
                <strong>Location:</strong>{" "}
                {device.location?.locationName || "N/A"}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button varianttype="modal" onClick={onClose}>
                  Close
                </Button>
              </Box>
            </>
          ) : (
            <Typography sx={{ textAlign: "center" }}>
              Loading device information...
            </Typography>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ViewModal;
