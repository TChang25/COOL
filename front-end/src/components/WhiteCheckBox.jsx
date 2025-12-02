import React from 'react';
import { Checkbox } from '@mui/material';

const WhiteCheckbox = (props) => {
  return (
    <Checkbox
      {...props}
      sx={{
        // Target the icon element that holds the checkbox graphic
        '& .MuiSvgIcon-root': {
          color: 'white', // Default (unchecked) state color
        },
        // Target the element when it is in the checked state
        '&.Mui-checked': {
          color: 'white', // Checked state color
        },
        // Optional: Target the element when it is in the indeterminate state
        '&.MuiCheckbox-indeterminate': {
          color: 'white', // Indeterminate state color
        },
        // Optional: Target the element when it is disabled
        '&.Mui-disabled': {
          // You might want a slightly dimmer white for disabled state
          color: 'rgba(255, 255, 255, 0.5)', 
        },
      }}
    />
  );
};

export default WhiteCheckbox;