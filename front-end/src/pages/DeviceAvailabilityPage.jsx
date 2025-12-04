import React, { useState, useEffect } from "react";
import DeviceAvailabilityTable from "../components/DeviceAvailabilityTable";
import { Box, Typography } from "@mui/material";
import Button from "../components/Button";
import FilterCenter from "../components/FilterCenter";
import { useAuth } from "../context/MockAuth";

const DeviceAvailabilityPage = () => {
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // NEW: locations loaded from backend
  const [locations, setLocations] = useState([]);

  const { user } = useAuth();
  const role = user?.role || "Citizen";

  // ------------------------------------------------------
  // FETCH LOCATIONS FROM BACKEND
  // ------------------------------------------------------
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const res = await fetch("/api/locations");

        if (!res.ok) throw new Error("Failed to load locations");

        const data = await res.json();

        // Convert locations into FilterCenter format: { name: "Location Name" }
        const formatted = data.map((loc) => ({
          name: loc.locationName,
          id: loc.locationId,
        }));

        setLocations(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    loadLocations();
  }, []);

  // ------------------------------------------------------
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
      <Typography variant="h1" sx={{ mb: 4 }}>
        Device Availability
      </Typography>

      {/* Top Row */}
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

        {/* 🔹 REAL LOCATIONS FILTER */}
        <FilterCenter
          centers={locations} // ⬅️ now using DB data
          value={selectedCenter}
          onChange={handleCenterChange}
        />

        <Button varianttype="primary" route="/nearest">
          Find Nearest Center
        </Button>
      </Box>

      {/* 🔹 Status / Type Filter */}
      {/* <FilterCenter
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
      /> */}

      {/* CREATE DEVICE BUTTON — EMPLOYEE + ADMIN ONLY */}
      {role !== "Citizen" && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button varianttype="create" route="/devices/create">
            Create Device
          </Button>
        </Box>
      )}

      {/* DEVICE TABLE */}
      <DeviceAvailabilityTable
        selectedCenter={selectedCenter}
        selectedFilter={selectedFilter}
      />
    </Box>
  );
};

export default DeviceAvailabilityPage;
