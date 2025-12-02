import React from 'react';
import { FormLabel } from '@mui/material';

const WhiteFormLabel = (props) => {
  return (
    <FormLabel
      {...props}
      sx={{
        color: 'white',
        '&.Mui-focused': {
          color: 'white',
        },
        '&.Mui-disabled': {
          color: 'rgba(255, 255, 255, 0.5)',
        },
      }}
    />
  );
};

export default WhiteFormLabel;