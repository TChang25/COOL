import React, { useState } from "react";
import { centers } from "../data/mockData"; // 👈 import from your mockData
import DeviceAvailabilityTable from "../components/DeviceAvailabilityTable";
import { Box, Typography } from "@mui/material";
import Button from "../components/Button";
import FilterCenter from "../components/FilterCenter";

const DeviceAvailabilityPage = () => {
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleCenterChange = (center) => {
    setSelectedCenter(center);
    setSelectedFilter("All");
  };

  const handleDeviceFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

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
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#2C2C2C",
          mb: 4,
        }}
      >
        Device Availability
      </Typography>

      {/* Top row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          mb: 6,
          flexWrap: "wrap",
        }}
      >
        <Button varianttype="primary" route="/eligibility">
          Check Eligibility
        </Button>

        {/* 🔹 Filter for Center */}
        <FilterCenter
          centers={centers.map((c) => ({ name: c.name }))} // instead of locations.map
          value={selectedCenter}
          onChange={handleCenterChange}
        />

        <Button varianttype="primary" route="/nearest">
          Find Nearest Center
        </Button>
      </Box>

      {/* 🔹 Filter for Device Type / Availability */}
      <FilterCenter
        centers={[
          { name: "All" },
          { name: "Available" },
          { name: "Not Available" },
          { name: "Maintenance" },
          { name: "Lost" },
          { name: "Laptop" },
          { name: "Tablet" },
          { name: "Hotspot" },
        ]}
        value={selectedFilter}
        onChange={handleDeviceFilterChange}
        label="Filter by status or type"
      />

      {/* 📊 Device Table */}
      <DeviceAvailabilityTable
        selectedCenter={selectedCenter}
        selectedFilter={selectedFilter}
      />
    </Box>
  );
};

export default DeviceAvailabilityPage;
