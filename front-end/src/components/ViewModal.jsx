import React from "react";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import Button from "./Button"; // ✅ import your custom AppButton

const ViewModal = ({ open, onClose, device }) => {
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
                {device.name}
              </Typography>

              <Divider sx={{ bgcolor: "white", mb: 2 }} />

              <Typography sx={{ color: "white" }}>
                <strong>Type:</strong> {device.type}
              </Typography>
              <Typography sx={{ color: "white" }}>
                <strong>Serial:</strong> {device.serial}
              </Typography>
              <Typography sx={{ color: "white" }}>
                <strong>Status:</strong> {device.status}
              </Typography>
              <Typography sx={{ color: "white" }}>
                <strong>Location:</strong> {device.location}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button varianttype="modal" onClick={onClose}>
                  Close
                </Button>
              </Box>
            </>
          ) : (
            <Typography>Loading device information...</Typography>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ViewModal;
