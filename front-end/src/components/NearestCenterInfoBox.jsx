import React, { useMemo, useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Button from "./Button";

// the Haversine formula: this calculates distance between two latitude and longitude points
// (for the "distance from user location to the center location" feature)
function toRad(deg) {
  // converts degrees to radians
  return (deg * Math.PI) / 180;
}
function haversineMiles(a, b) {
  // returns distance in miles between point a and b, where a and b are objects like {lat: , long: }
  const R = 3958.8; // miles instead of kilometers (6371 km = 3958.8 miles)
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h)); // final distance in miles
}

// Uses Nominatim (OpenStreetMap) to convert a full address string into {lat, lng}
// If anything fails, it falls back to a default Orlando-ish coordinate.
async function geocodeAddress(query) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }
    }
  } catch (err) {
    console.error("Error geocoding address:", err);
  }
  // Fallback: Orlando city center (prevents the UI from breaking)
  return { lat: 28.53833, lng: -81.37924 };
}

// Builds Google Maps search URL for "Get Directions" button
// (The encodeURIComponent() method encodes special characters like: , / ? : @ & = + $ #)
function mapsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

// Component that renders ONE community center (one "card" in the list)
function CenterRow({
  index, // the number in the results list
  center, // a community center object (object is created by useMemo in the NearestCenterInfoBox component)
  distanceMiles, // distance from user's location (if available)
  eligibilityRoute = "/eligibility", // Where the Check Eligibility button should link to
  availabilityRoute = "/device", // Where the Device Availability button should link to
  onFocusOnMap, // optional callback to tell your map which center to highlight
}) {
  return (
    <Box
      sx={{
        p: 2,
        marginBottom: 2,
        bgcolor: "primary.dark",
        color: "white",
        boxShadow: 2,
        // override MUI Button styles within this component
        "& .MuiButton-root": {
          fontSize: 14,
          justifyContent: "center",
          height: 27,
          boxShadow: "none",
          padding: 0,
        },
      }}
      // highlights this center on a map when hovering
      onMouseEnter={() => onFocusOnMap && onFocusOnMap(center.locationId)}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {/* number in the results list with the center name */}
        {index}. {center.locationName}
        {/* distance to center from address entered */}
        {Number.isFinite(distanceMiles) && (
          <Typography component="span" sx={{ marginLeft: 1, fontWeight: 500 }}>
            ({distanceMiles.toFixed(1)} miles away)
          </Typography>
        )}
      </Typography>

      {/* full street address */}
      <Typography sx={{ marginTop: 0.5, marginLeft: 5 }}>{center.fullAddress}</Typography>

      {/* hours (not in DB yet → show fallback message) + phone */}
      <Typography sx={{ marginTop: 0.5, marginLeft: 5 }}>Phone: {center.contactNumber}</Typography>

      {/* this Stack component holds the action buttons */}
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
        {/* "Get Directions" button leads to an external link to google maps with the center's address*/}
        <Button
          varianttype="submit"
          onClick={() => window.open(mapsUrl(center.fullAddress), "_blank", "noopener")}
        >
          Get Directions
        </Button>

        {/* Internal routes to link to other pages of the website */}
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

// This is the main component that lists nearest centers with availability info
const NearestCenterInfoBox = ({
  userCoords = null, // { lat, lng } from AddressSearch
  eligibilityRoute = "/eligibility",
  availabilityRoute = "/device",
  onFocusOnMap,
}) => {
  const [centersData, setCentersData] = useState([]); // locations from DB (+ coords)
  const [devicesData, setDevicesData] = useState([]); // devices from DB
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // -------------------------
  // Fetch locations + devices, then geocode locations
  // -------------------------
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

        // 2) Build fullAddress string for each location
        const locationsWithAddress = locations.map((loc) => {
          const fullAddress = [loc.streetAddress, loc.city, loc.state, loc.zipCode]
            .filter(Boolean)
            .join(", ");

          return {
            ...loc,
            fullAddress,
            // coords will be added later
          };
        });

        // 3) Immediately show data from the backend
        setCentersData(locationsWithAddress);

        // We are done talking to our own API, so stop "Loading…" state now
        setIsLoading(false);

        // 4) Geocode in the background (do NOT await this in loadData)
        Promise.all(
          locationsWithAddress.map(async (loc) => {
            const coords = await geocodeAddress(loc.fullAddress);
            return { ...loc, coords };
          })
        )
          .then((geocodedLocations) => {
            // Update centers with coords once geocoding finishes
            setCentersData(geocodedLocations);
          })
          .catch((err) => {
            console.error("Error geocoding locations:", err);
            // optional: you could set some 'geocodeError' state here if you want
          });
      } catch (err) {
        console.error("Error loading locations:", err);
        setLoadError("Unable to load locations from the server.");
        setIsLoading(false); // make sure we don't get stuck
      }
    }

    loadData();
  }, []);

  // -------------------------
  // Compute distance + availability, then sort rows
  // -------------------------
  const rows = useMemo(() => {
    if (!centersData || centersData.length === 0) return [];

    const enriched = centersData.map((c) => {
      const distanceMiles = userCoords && c.coords ? haversineMiles(userCoords, c.coords) : NaN;

      return { center: c, distanceMiles };
    });

    if (userCoords) {
      enriched.sort((a, b) => a.distanceMiles - b.distanceMiles);
    } else {
      enriched.sort((a, b) => a.center.locationName.localeCompare(b.center.locationName));
    }

    return enriched;
  }, [centersData, userCoords]);

  return (
    <Box
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        p: { xs: 2, md: 3 },
        // fixed size that matches the mock up design sizing, with scroll for overflow
        width: 564,
        height: 470,
        overflowY: "auto",
        // override MUI Typography styles within this component (makes text white, same as box text color)
        "& .MuiTypography-root": {
          color: "inherit",
        },
        //makes the scrollbar invisible
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

// exports the component as default
export default NearestCenterInfoBox;
