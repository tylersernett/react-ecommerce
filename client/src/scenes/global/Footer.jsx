import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { shades } from "../../theme";

function Footer() {
  // const { palette: { neutral }, } = useTheme();

  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={shades.neutral[900]}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridGap: '30px',
          columnGap: "60px",
          // padding: '20px',
          color: '#fff',
          '@media (max-width: 992px)': {
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto'
          },
          '@media (max-width: 576px)': {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto auto auto'
          }
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            '@media (max-width: 992px)': {
              gridColumnStart: '1',
              gridColumnEnd: '3',
            },
            '@media (max-width: 576px)': {
              gridColumnStart: '1',
              gridColumnEnd: '2',
            }
          }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb="10px"
              letterSpacing='.1rem'
              color={shades.secondary[500]}
            >
              THE HOOD
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '14px', lineHeight: 1.5, m: 0 }}>
              Nunc sed augue lacus viverra vitae congue eu. Eget magna fermentum iaculis eu.
              Turpis cursus in hac habitasse platea dictumst quisque sagittis purus.
              Auctor eu augue ut lectus. Amet facilisis magna etiam tempor.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" fontWeight="bold" mb="10px" color={shades.secondary[500]}>
              Customer Care
            </Typography>
            <Typography mb="10px">Help Center</Typography>
            <Typography mb="10px">Track Your Order</Typography>
            <Typography mb="10px">Returns & Refunds</Typography>
            <Typography mb="10px">Privacy Poliy</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', }} >
            <Typography variant="h4" fontWeight="bold" mb="10px" color={shades.secondary[500]}>
              Contact Us
            </Typography>
            <Typography variant="body1" mb="10px" >
              3206 Harrelson St <br />
              Las Cruces, NM 88005
            </Typography>
            <Typography variant="body1" mb="10px" >
              (575) 621 - 0931 or<br />(575) 644 - 3372
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 7fr',
              gap: '12px',
            }}>
              <Box >
                <Typography >Friday</Typography>
                <Typography >Saturday</Typography>
                <Typography >Sunday</Typography>
              </Box>
              <Box >
                <Typography >12–5p</Typography>
                <Typography >12–5p</Typography>
                <Typography >12–4p</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}

export default Footer;