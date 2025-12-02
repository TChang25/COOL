import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FilterCenter = ({
  centers = [],
  value,
  onChange,
  label = "Select a center",
}) => {
  const handleChange = (event) => {
    const selected = event.target.value;
    onChange && onChange(selected); // 👈 notify parent (DeviceAvailabilityPage)
  };

  return (
    <FormControl
      sx={{
        margin: 2,
        minWidth: 250,
        backgroundColor: "white",
        borderRadius: 1,
      }}
      size="small"
    >
      <InputLabel id="center-filter-label">
        <i>{label}</i>
      </InputLabel>
      <Select
        labelId="center-filter-label"
        id="center-filter"
        value={value || ""}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="">All Centers</MenuItem>
        {centers.map((center, index) => (
          <MenuItem key={index} value={center.name}>
            {center.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterCenter;
