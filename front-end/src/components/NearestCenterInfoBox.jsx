// NearestCenterInfoBox.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Button from "./Button";

/**
 * Option A:
 * Hard-coded coordinates for each location_id from the `location` table.
 *
 * ⚠️ IMPORTANT:
 * The lat/lng values below are just placeholder examples so that
 * distances are different. Replace them with real coordinates when you can.
 */
const LOCATION_COORDS = {
  1: { lat: 28.545, lng: -81.387 }, // Callahan Neighborhood Center
  2: { lat: 28.548, lng: -81.41 }, // Hankins Park Neighborhood Center
  3: { lat: 28.565, lng: -81.43 }, // Northwest Neighborhood Center
  4: { lat: 28.58, lng: -81.43 }, // Rosemont Neighborhood Center
  5: { lat: 28.535, lng: -81.41 }, // Smith Neighborhood Center
  6: { lat: 28.515, lng: -81.3 }, // Citrus Square Neighborhood Center
  7: { lat: 28.54, lng: -81.31 }, // Engelwood Neighborhood Center
  8: { lat: 28.535, lng: -81.4 }, // Jackson Neighborhood Center
  9: { lat: 28.54, lng: -81.41 }, // L Claudia Allen Senior Center
  10: { lat: 28.515, lng: -81.39 }, // Grand Avenue Neighborhood Center
  11: { lat: 28.54, lng: -81.45 }, // Ivey Lane Neighborhood Center
  12: { lat: 28.545, lng: -81.36 }, // Langford Park Neighborhood Center
  13: { lat: 28.545, lng: -81.41 }, // Rock Lake Neighborhood Center
  14: { lat: 28.515, lng: -81.37 }, // Wadeview Neighborhood Center
  15: { lat: 28.52, lng: -81.33 }, // Dover Shores Neighborhood Center
  16: { lat: 28.55, lng: -81.35 }, // Hispanic Office for Local Assistance
};

// -------------------
// Haversine helpers
// -------------------
function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function haversineMiles(a, b) {
  const R = 3958.8; // miles
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Google Maps URL for "Get Directions"
function mapsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

// -------------------
// Center row component
// -------------------
function CenterRow({
  index,
  center,
  distanceMiles,
  eligibilityRoute = "/eligibility",
  availabilityRoute = "/device",
  onFocusOnMap,
}) {
  // --- Inspect what the backend actually sent us ---
  console.log("CenterRow center object:", center);

  // Try multiple possible field names for the street, just in case
  const street =
    center.streetAddress || center.address || center.locationAddress || center.street_address || "";

  const city = center.city || "";
  const state = center.state || "";
  const zip = center.zipCode || center.zip_code || "";

  // City/state/ZIP line for display
  const cityStateZip = [city, state, zip].filter(Boolean).join(", ");

  // This is the **string we will send to Google Maps**
  const mapsAddress = [center.locationName, street, cityStateZip].filter(Boolean).join(", ");

  console.log("Address for Maps:", mapsAddress);

  return (
    <Box
      sx={{
        p: 2,
        marginBottom: 2,
        bgcolor: "primary.dark",
        color: "white",
        boxShadow: 2,
        "& .MuiButton-root": {
          fontSize: 14,
          justifyContent: "center",
          height: 27,
          boxShadow: "none",
          padding: 0,
        },
      }}
      onMouseEnter={() => onFocusOnMap && onFocusOnMap(center.locationId)}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {index}. {center.locationName}
        {Number.isFinite(distanceMiles) && (
          <Typography component="span" sx={{ marginLeft: 1, fontWeight: 500 }}>
            ({distanceMiles.toFixed(1)} miles away)
          </Typography>
        )}
      </Typography>

      {/* Street line */}
      {street && <Typography sx={{ marginTop: 0.5, marginLeft: 5 }}>{street}</Typography>}

      {/* City / State / ZIP line */}
      {cityStateZip && <Typography sx={{ marginLeft: 5 }}>{cityStateZip}</Typography>}

      {/* Phone */}
      <Typography sx={{ marginTop: 0.5, marginLeft: 5 }}>Phone: {center.contactNumber}</Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          marginTop: 1,
          justifyContent: "space-evenly",
        }}
        useFlexGap
        flexWrap="wrap"
      >
        {/* Get Directions uses the combined name + street + city/state/zip */}
        <Button
          varianttype="submit"
          onClick={() => {
            console.log("Opening Google Maps for:", mapsAddress);
            window.open(mapsUrl(mapsAddress), "_blank", "noopener");
          }}
        >
          Get Directions
        </Button>

        <Button varianttype="submit" route={eligibilityRoute}>
          Check Eligibility
        </Button>

        <Button varianttype="submit" route={availabilityRoute} fullWidth>
          View Device Availability
        </Button>
      </Stack>
    </Box>
  );
}

// -------------------
// Main component
// -------------------
const NearestCenterInfoBox = ({
  userCoords = null, // { lat, lng } from AddressSearch
  eligibilityRoute = "/eligibility",
  availabilityRoute = "/device",
  onFocusOnMap,
}) => {
  const [centersData, setCentersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Fetch locations from backend (no geocoding here)
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const locationsRes = await fetch("/api/locations");
        if (!locationsRes.ok) {
          throw new Error("Failed to load locations");
        }

        const locations = await locationsRes.json();

        // inside loadData(), when we map locations:
        const locationsWithExtras = locations.map((loc) => {
          // Try several possible field names in case your JSON uses "address" instead of "streetAddress"
          const street = loc.streetAddress || loc.address || loc.street_address || "";

          const city = loc.city || "";
          const state = loc.state || "";
          const zip = loc.zipCode || loc.zip_code || "";

          // This is what we’ll pass to Google Maps
          const fullAddress = [street, city, state, zip].filter(Boolean).join(", ");

          return {
            ...loc,
            fullAddress,
            coords: LOCATION_COORDS[loc.locationId] || null,
          };
        });

        setCentersData(locationsWithExtras);
      } catch (err) {
        console.error("Error loading locations:", err);
        setLoadError("Unable to load locations from the server.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Compute distance + sort
  const rows = useMemo(() => {
    if (!centersData || centersData.length === 0) return [];

    const enriched = centersData.map((c) => {
      const distanceMiles = userCoords && c.coords ? haversineMiles(userCoords, c.coords) : NaN;

      return { center: c, distanceMiles };
    });

    if (userCoords) {
      // Sort centers with a valid distance first, then any without coords
      const withCoords = enriched.filter((r) => Number.isFinite(r.distanceMiles));
      const withoutCoords = enriched.filter((r) => !Number.isFinite(r.distanceMiles));

      withCoords.sort((a, b) => a.distanceMiles - b.distanceMiles);
      return [...withCoords, ...withoutCoords];
    }

    // No userCoords → sort alphabetically by name
    enriched.sort((a, b) => a.center.locationName.localeCompare(b.center.locationName));
    return enriched;
  }, [centersData, userCoords]);

  return (
    <Box
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        p: { xs: 2, md: 3 },
        width: 564,
        height: 470,
        overflowY: "auto",
        "& .MuiTypography-root": {
          color: "inherit",
        },
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {isLoading && <Typography>Loading nearest centers…</Typography>}

      {loadError && (
        <Typography color="error" sx={{ mt: 1 }}>
          {loadError}
        </Typography>
      )}

      {!isLoading && !loadError && rows.length === 0 && <Typography>No centers found.</Typography>}

      <Typography sx={{ fontSize: 14, display: "flex", justifyContent: "center" }}>
        Distances are approximate
      </Typography>

      {!isLoading &&
        !loadError &&
        rows.map((row, i) => (
          <CenterRow
            key={row.center.locationId}
            index={i + 1}
            center={row.center}
            distanceMiles={row.distanceMiles}
            eligibilityRoute={eligibilityRoute}
            availabilityRoute={availabilityRoute}
            onFocusOnMap={onFocusOnMap}
          />
        ))}
    </Box>
  );
};

export default NearestCenterInfoBox;
