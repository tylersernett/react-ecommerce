import React from 'react'
import { Box, Typography } from "@mui/material";

const key = process.env.REACT_APP_THRESHOLD_KEY;

const Appointments = () => {
  return (
    <Box m="100px auto" width="80%" mx='auto' >

      <Box textAlign='center'>
      <Typography fontSize={'1rem'} my='20px'>Can't come in person? Take a virtual tour below.</Typography>
      <iframe title='threshold360'
        src={`https://cloud.threshold360.com/embed/locations/8447298?webKey=${key}`}
        width="600"
        height="400"
        style={{ border: '0px' }}
        allowFullScreen={true}
      >
      </iframe>
      </Box>
      
    </Box>

  )
}

export default Appointments