import React from 'react'
import { Box, Typography } from "@mui/material";

const Thankyoubooked = () => {
  return (
    <Box m="100px auto" width="80%" height="42vh">
      <Typography>Thank you—your booking has been received. We'll be in touch soon.</Typography>
    </Box>
  )
}

export default Thankyoubooked

//TODO: pass in appointment props and display above