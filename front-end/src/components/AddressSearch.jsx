import React, { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

// This component is the search bar at the top of the NearestCenterInfoBox component.
// It allows users to input an address and triggers a search for the NearestCenterInfoBox component to display the data
const AddressSearch = ({ onSearch, initialAddress = "" }) => {
  // value is the current text in the search input, setValue is the function to update it
  const [value, setValue] = useState(initialAddress);
  // isLoading indicates whether the search is currently in progress, setIsLoading is the function to update it
  const [isLoading, setIsLoading] = useState(false);

  /* This function takes an address query and returns the geocoded coordinates (latitude and longitude).
   * It uses the Nominatim API from OpenStreetMap to perform the geocoding.
   * If the API call fails or returns no results, it falls back to a default location
   * (Orlando city center) or a specific demo address for testing purposes.
   */
  async function geocodeAddress(query) {
    try {
      // encodeURIComponent makes sure special characters (spaces, commas, etc.) are properly formatted for a URL
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`;
      // The Nominatim API returns an array of results.
      const response = await fetch(url);
      // check if server responded successfully
      if (response.ok) {
        // convert response data to JSON
        const data = await response.json();
        // if we have results, return the coordinates of the first result
        if (Array.isArray(data) && data.length > 0) {
          return {
            // parseFloat converts the string values of lat and lon into numbers (floats) for easier use in calculations
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          };
        }
      }
      // If the API call fails or returns no results the function will fall back to a default location (Orlando city center)
    } catch {
      // ignore and send to default address or demo address
    }
    // Local demo for address “1234 Goldenrod Street” so it will work without an API call.
    // const q = query.toLowerCase();
    // if (q.includes("1234 goldenrod")) return { lat: 28.5386, lng: -81.3853 };

    // City center default (Orlando)
    // return { lat: 28.53833, lng: -81.37924 };
  }

  // provides data to NearestCenterInfoBox component through onSearch
  const doSearch = async () => {
    // "value" is what the user typed, "trimmedValue" removes leading and trailing spaces
    const trimmedValue = value.trim();
    // exits the function if theres no text and changes isLodaing to true
    if (!trimmedValue) return;
    setIsLoading(true);
    try {
      // await pauses execution until the API call finishes
      const coords = await geocodeAddress(trimmedValue);
      //  onSearch is a function passed in as a prop, ".?" will only onSearch if it exists
      onSearch?.({ coords, address: trimmedValue }); // "coords" is needed for distance sorting in NearestCenterInfoBox
    } finally {
      // fianlly block will run if the search was either successful or not
      setIsLoading(false); // without this, a network failure could leave isLoading stuck at true
    }
  };

  return (
    // the white rounded "pill" search bar
    <Paper
      elevation={0}
      sx={{
        borderRadius: "32px",
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        width: 565,
        mx: "auto",
      }}
    >
      {/* the "Menu" icon doesn't do anything yet, it's just decorative */}
      {/* <IconButton disableRipple sx={{ mr: 1 }}>
        <MenuIcon />
      </IconButton> */}

      {/* The text input where the user enters the address */}
      <InputBase
        fullWidth // makes the input expand to fill all available horizontal space
        placeholder="Enter your house number and street name" // placeholer text, can be changed to something else
        inputProps={{ "aria-label": "search address" }} // provides an name for screen readers (accessibility)
        value={value} // binds the input box to React state
        onChange={(e) => setValue(e.target.value)} // updates state when the user types
        onKeyDown={(e) => e.key === "Enter" && doSearch()} // pressing Enter triggers the search
        sx={{ fontSize: 20, lineHeight: 1.2, py: 1, marginLeft: 3 }}
      />

      {/* Search icon button that triggers doSearch() when clicked */}
      <IconButton
        onClick={doSearch} // run the search function when clicked
        disabled={isLoading} // disable while we are waiting on geocoding
        aria-label="search" // accessibility label
        sx={{ ml: 1 }} // add a bit of spacing on the left
      >
        {/* the actual magnifying glass icon */}
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default AddressSearch;
