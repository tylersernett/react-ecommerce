import React from 'react'
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";
import AppointmentBooking from './AppointmentBooking';
const key = process.env.REACT_APP_THRESHOLD_KEY;

const Appointments = () => {

  return (
    <Box m="100px auto" width='80%' mx='auto' >
      <Box mx='auto'>
        <Typography variant='h2' textAlign='center' my='20px' color={shades.secondary[400]}>
          Private Tours
        </Typography>
        <Typography fontSize={'1rem'} mb='20px'>
          Whether it's in preparation for an upcoming
          birthday, holiday, or you'd just like to visit,
          if you're interested in taking a private tour of The Hood,
          you can find our guidelines and appointment info below.
        </Typography>
        <AppointmentBooking />
        <Box textAlign='center'>
          <Typography fontSize={'1.5rem'} my='20px'>Can't come in person? Take a <span style={{ color: shades.secondary[400] }}>virtual tour</span> below.</Typography>
          <iframe title='threshold360'
            src={`https://cloud.threshold360.com/embed/locations/8447298?webKey=${key}`}
            width="100%"
            height='350px'
            style={{ border: '0px' }}
            allowFullScreen={true}
          >
          </iframe>
        </Box>
      </Box>
    </Box>
  )
}

export default Appointments