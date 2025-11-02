import React from 'react';
import { FormControlLabel } from '@mui/material';
import WhiteCheckbox from './WhiteCheckBox';

const WhiteFormControlLabel = (props) => {
  return (
    <FormControlLabel
      {...props}
      control={props.control || <WhiteCheckbox />}
      sx={{
        '& .MuiTypography-root': {
          color: 'white',
        },
        '&.Mui-disabled': {
           '& .MuiTypography-root': {
              color: 'rgba(255, 255, 255, 0.5)',
           }
        }
      }}
    />
  );
};

export default WhiteFormControlLabel;