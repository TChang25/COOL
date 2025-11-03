import React from 'react'
import { Box, Typography } from "@mui/material";
import RequirementEligibility from '../components/RequirementEligibility';
import AddressSearch from "../components/AddressSearch";


const EligibilityPage = () => {
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
        gap: 6
      }}
    >
      <Typography
        variant="h1"
        sx={{
        }}
      >
        Eligibility
      </Typography>
      <AddressSearch
        onSearch={({ coords }) => setUserCoords(coords)}
        initialAddress=""
      />

      <RequirementEligibility />
    </Box>
  );
}

export default EligibilityPage