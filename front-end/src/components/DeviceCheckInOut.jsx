import React, { useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import WhiteTextField from "./WhiteTextField";
import WhiteSelectField from "./WhiteSelectField";
import WhiteCheckbox from "./WhiteCheckBox";
import FormGroup from "@mui/material/FormGroup";
import WhiteFormControlLabel from "./WhiteFormControlLabel";
import WhiteFormLabel from "./WhiteFormLabel";
import { users, centers } from "../data/mockData"; // ✅ keep this import only

const Checkout = ({ handleSubmit, formData, handleChange, error }) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 5 }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "white",
          textAlign: "center",
        }}
      >
        Device Check-Out
      </Typography>

      <WhiteSelectField
        label="Checkout Location"
        name="checkoutLocation"
        value={formData.checkoutLocation}
        onChange={handleChange}
        fullWidth
        select
        error={!!error}
        helperText={error}
      >
        {centers.map((center, index) => (
          <MenuItem key={index} value={center.name}>
            {center.name}
          </MenuItem>
        ))}
      </WhiteSelectField>
      <WhiteSelectField
        label="Employee Name"
        name="employeeName"
        value={formData.checkoutLocation}
        onChange={handleChange}
        fullWidth
        select
        error={!!error}
        helperText={error}
      >
        {users.map((user, index) => {
          let temp = user.name;
          return (
            <MenuItem key={index} value={temp}>
              {temp}
            </MenuItem>
          );
        })}
      </WhiteSelectField>
      <WhiteSelectField
        label="Bin Type"
        name="binType"
        value={formData.binType}
        onChange={handleChange}
        fullWidth
        select
        error={!!error}
        helperText={error}
      >
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="Tablet">Tablet</MenuItem>
        <MenuItem value="Hotspot">Hotspot</MenuItem>
      </WhiteSelectField>
      <WhiteTextField
        label="Bin Number"
        name="binNumber"
        value={formData.binNumber}
        onChange={handleChange}
        fullWidth
        error={!!error}
        helperText={error}
      />
      <WhiteTextField
        label="What is the resident's name?"
        name="residentName"
        value={formData.residentName}
        onChange={handleChange}
        fullWidth
        error={!!error}
      />
      <WhiteTextField
        label="What is the resident's phone number?"
        name="residentPhoneNumber"
        value={formData.residentPhoneNumber}
        onChange={handleChange}
        fullWidth
        error={!!error}
      />
      <WhiteTextField
        label="What is the resident's address?"
        name="residentAddress"
        value={formData.residentAddress}
        onChange={handleChange}
        fullWidth
        error={!!error}
      />
      <WhiteTextField
        label="Reason for checkout?"
        name="residentCheckoutReason"
        value={formData.residentCheckoutReason}
        onChange={handleChange}
        fullWidth
        multiline
        error={!!error}
      />
      <Button type="submit" varianttype="sign">
        Check-out
      </Button>
    </Box>
  );
}

const CheckIn = ({ handleSubmit, formData, handleChange, error }) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 5 }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "white",
          textAlign: "center",
        }}
      >
        Device Check-In
      </Typography>

      <WhiteSelectField
        label="Checkout Location"
        name="checkoutLocation"
        value={formData.checkoutLocation}
        onChange={handleChange}
        fullWidth
        select
        error={!!error}
        helperText={error}
      >
        {centers.map((center, index) => (
          <MenuItem key={index} value={center.name}>
            {center.name}
          </MenuItem>
        ))}
      </WhiteSelectField>
      <WhiteSelectField
        label="Employee Name"
        name="employeeName"
        value={formData.checkoutLocation}
        onChange={handleChange}
        fullWidth
        select
        error={!!error}
        helperText={error}
      >
        {users.map((user, index) => {
          let temp = user.name;
          return (
            <MenuItem key={index} value={temp}>
              {temp}
            </MenuItem>
          );
        })}
      </WhiteSelectField>
      <WhiteSelectField
        label="Bin Type"
        name="binType"
        value={formData.binType}
        onChange={handleChange}
        fullWidth
        select
        error={!!error}
        helperText={error}
      >
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="Tablet">Tablet</MenuItem>
        <MenuItem value="Hotspot">Hotspot</MenuItem>
      </WhiteSelectField>
      <WhiteTextField
        label="Bin Number"
        name="binNumber"
        value={formData.binNumber}
        onChange={handleChange}
        fullWidth
        error={!!error}
        helperText={error}
      />
      <WhiteTextField
        label="What is the resident's name?"
        name="residentName"
        value={formData.residentName}
        onChange={handleChange}
        fullWidth
        error={!!error}
      />
      <WhiteTextField
        label="What is the resident's phone number?"
        name="residentPhoneNumber"
        value={formData.residentPhoneNumber}
        onChange={handleChange}
        fullWidth
        error={!!error}
      />
      <WhiteTextField
        label="What is the resident's address?"
        name="residentAddress"
        value={formData.residentAddress}
        onChange={handleChange}
        fullWidth
        error={!!error}
      />
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2, // space between label and grid
          alignItems: "center", // centers everything horizontally
        }}
      >
        {/* Label on its own line */}
        <WhiteFormLabel
          component="legend"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1.1rem",
            marginBottom: "8px",
            textAlign: "center", // ✅ label centered
          }}
        >
          Device Return Checklist
        </WhiteFormLabel>

        {/* Centered 2-column grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1.5,
            justifyContent: "center", // ✅ centers the grid itself
            alignItems: "center",
            width: "fit-content", // ✅ keeps grid tight around content
          }}
        >
          <WhiteFormControlLabel
            control={<WhiteCheckbox />}
            label="Noticeable Damage?"
          />
          <WhiteFormControlLabel
            control={<WhiteCheckbox />}
            label="All accessories returned?"
          />
          <WhiteFormControlLabel
            control={<WhiteCheckbox />}
            label="Resident first offense?"
          />
          <WhiteFormControlLabel
            control={<WhiteCheckbox />}
            label="Does device turn on?"
          />
        </Box>
      </FormGroup>

      <WhiteTextField
        label="Reason for damage?"
        name="residentDamageReason"
        value={formData.residentDamageReason}
        onChange={handleChange}
        fullWidth
        multiline
        error={!!error}
      />
      <WhiteTextField
        label="Follow-up Notes?"
        name="residentNotes"
        value={formData.residentNotes}
        onChange={handleChange}
        fullWidth
        multiline
        error={!!error}
      />
      <Button type="submit" varianttype="sign">
        Check-In
      </Button>
    </Box>
  );
}

const DeviceCheckInOut = ({checkType}) => {

  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
  checkoutLocation: "",
  employeeName: "",
  binType: "",
  binNumber: "",
  residentName: "",
  residentPhoneNumber: "",
  residentAddress: "",
  residentCheckoutReason: "",
  residentDamageReason: "",
  residentNotes: "",
});

  
   const [error, setError] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let success = true

    if (success) {
      setError("");
      navigate("/device");
    } else {
        setError("Invalid email or password.");
    }
  };

  return (

    <Box
      sx={{
        display: "flex",
        alignItmes: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#002D72",
        width: "30%",
        padding: "50px",
        textAlign: "center",
      }}
    >
      {
        checkType === 'OUT' && 
        <Checkout 
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        error={error}
        />
      }
      {
        checkType === 'IN' && 
        <CheckIn 
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        error={error}
        />
      }
      
    </Box>

  );
};

export default DeviceCheckInOut;
