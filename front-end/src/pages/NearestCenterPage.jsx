import React, {useState} from 'react'
import {Box} from "@mui/material"
import NearestCenterInfoBox from '../components/NearestCenterInfoBox'
import AddressSearch from '../components/AddressSearch'

function NearestCenterPage() {
  const [userCoords, setUserCoords] = useState(null);

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

        <AddressSearch 
        onSearch={({coords}) => setUserCoords(coords)}
        initialAddress=""/>        

      <div style={{ marginTop: 16 }}>
        <NearestCenterInfoBox userCoords={userCoords} />
      </div>
       
    </Box>
   

  )
}

export default NearestCenterPage