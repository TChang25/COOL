import React from 'react'
import DeviceCheckInOut from '../components/DeviceCheckInOut'
import { Box } from "@mui/material";


const DeviceCheckIn = () => {
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
                  <DeviceCheckInOut checkType="IN"/>
      
                </Box>
  )
}

export default DeviceCheckIn