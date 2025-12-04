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

const UserModal = ({ open, onClose, user }) => {
  if (!user) return null;

  const roleName = user.role?.roleName || "—";

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <Card
        sx={{
          width: 420,
          bgcolor: "#002D72",
          color: "white",
          borderRadius: "16px",
          boxShadow: 10,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: 700, color: "white" }}
          >
            {user.fullName}
          </Typography>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />

          <Info label="Email" value={user.email} />
          <Info label="Role" value={roleName} />
          <Info label="Phone" value={user.contactNumber} />
          <Info label="DL Number" value={user.dlNum} />
          <Info label="DL State" value={user.dlState} />
          <Info label="DOB" value={user.dateOfBirth} />
          <Info
            label="Address"
            value={`${user.city || ""}, ${
              user.state || ""
            } ${user.zipCode || ""}`}
          />

          <Box sx={{ textAlign: "right", mt: 3 }}>
            <Button varianttype="view" onClick={onClose}>
              Close
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
};

const Info = ({ label, value }) => (
  <Box sx={{ mb: 1 }}>
    <Typography variant="body2" sx={{ opacity: 0.7, color: "white" }}>
      {label}
    </Typography>
    <Typography variant="body1" sx={{ color: "white" }}>
      {value || "—"}
    </Typography>
  </Box>
);

export default UserModal;
