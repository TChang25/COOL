import React, { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Button from "./Button";
import { centers, devices } from "../data/mockData";

// Availability by center/type (true if ANY device of that type is Available at that center)
function getTypeAvailabilityForCenter(centerName, devicesList) {
  const byCenter = devicesList.filter((d) => d.location === centerName);
  const has = (t) => byCenter.some((d) => d.type === t && d.status === "Available");
  return { laptop: has("Laptop"), tablet: has("Tablet"), hotspot: has("Hotspot") };
}

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
  availability, // object like { laptop: true/false, tablet: ..., hotspot: ... } (apart of the center object created by useMemo)
  eligibilityRoute = "/eligibility", // Where the Check Eligibility button should link to
  availabilityRoute = "/device", // Where the Device Availability button should link to
  onFocusOnMap, // optional callback to tell your map which center to highlight
}) {
  // availabilityText is a helper formatting function that just converts availability boolean values into readable text.
  // Takes in a label and boolean value and returns formatted string
  const availabilityText = (label, isAvailable) =>
    `${label}: ${isAvailable ? "✓ Available" : "✗ Not Available"}`;

  return (
    <Box
      sx={{
        p: 2,
        marginBottom: 5,
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
      onMouseEnter={() => onFocusOnMap && onFocusOnMap(center.id)}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {/* number in the results list with the center name */}
        {index}. {center.name}
        {/* distance to center from address entered */}
        {Number.isFinite(distanceMiles) && (
          <Typography component="span" sx={{ marginLeft: 1, fontWeight: 500 }}>
            ({distanceMiles.toFixed(1)} miles away)
          </Typography>
        )}
      </Typography>
      {/* address, hours and phone number of the center  */}
      <Typography sx={{ marginTop: 1 }}>{center.address}</Typography>
      <Typography sx={{ marginTop: 0.5 }}>
        Hours: {center.hours} | Phone: {center.phone}
      </Typography>
      {/* availability of device types */}
      <Typography sx={{ marginTop: 1.5 }}>
        {availabilityText("Laptop", availability.laptop)} |{" "}
        {availabilityText("Tablet", availability.tablet)} |{" "}
        {availabilityText("Hotspot", availability.hotspot)}
      </Typography>
      {/* this Stack component holds the action buttons */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          marginTop: 2,
          justifyContent: "space-between",
        }}
        useFlexGap
        flexWrap="wrap"
      >
        {/* "Get Directions" button leads to an external link to google maps with the center's address*/}
        <Button
          varianttype="submit"
          onClick={() => window.open(mapsUrl(center.address), "_blank", "noopener")}
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
  // Optional props you can feed from parent/search/map
  userCoords = null, // {lat, lng} from the search component input, if no input then null
  centersData = centers, // array of community centers to show (from mockData.js)
  devicesData = devices, // array of devices to check availability (from mockData.js)
  eligibilityRoute = "/eligibility", // route for the Check Eligibility button
  availabilityRoute = "/device", // route for the Device Availability button
  onFocusOnMap, // callback to highlight a center on the map
}) => {
  // useMemo: Only recalculate sorting and distance when inputs change
  // compute distance and availability, then sort by distance if we have coords
  const rows = useMemo(() => {
    // Add distance and availability to each center
    const enriched = centersData.map((c) => {
      // if we have user coords, calculate distance, else NaN
      const distanceMiles = userCoords ? haversineMiles(userCoords, c.coords) : NaN;
      // calls function that returns an object that contains the data to get availability of device types at center
      const availability = getTypeAvailabilityForCenter(c.name, devicesData);
      // return new object with center, distance, and availability
      return { center: c, distanceMiles, availability };
    });

    // Sort by nearest if we know user location, otherwise just sort alphabetically
    if (userCoords) {
      enriched.sort((a, b) => a.distanceMiles - b.distanceMiles);
    } else {
      enriched.sort((a, b) => a.center.name.localeCompare(b.center.name));
    }

    // return the final array with calculated and sorted data
    return enriched;
    // this is the dependency array for "useMemo" useEffect
  }, [centersData, devicesData, userCoords]); // re-runs "useMemo" if any of these change

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
      {/* "rows" was created by useMemo. It is an array of center info with distance and availability */}
      {rows.map((row, i) => (
        // "CenterRow" is the component that displays each community center info card
        <CenterRow
          key={row.center.id} // each item must have a unique key
          index={i + 1} // this will show 1, 2, 3... in the list instead of 0, 1, 2...
          center={row.center} // the full center object
          distanceMiles={row.distanceMiles} // distance from user
          availability={row.availability} // availability of device types
          eligibilityRoute={eligibilityRoute} // route to eligibility page
          availabilityRoute={availabilityRoute} // route to device availability page
          onFocusOnMap={onFocusOnMap} // callback to highlight on map
        />
      ))}
    </Box>
  );
};

// exports the component as default
export default NearestCenterInfoBox;
