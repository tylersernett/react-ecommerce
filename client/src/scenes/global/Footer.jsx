import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { shades } from "../../theme";

function FacebookLink() {
  return (
    <IconButton
      aria-label="Facebook"
      href="https://www.facebook.com/thehoodnewmexico/"
      target="_blank"
      rel="noopener"
    >
      <FacebookIcon sx={{ color: shades.secondary[500] }} fontSize='large' />
    </IconButton>
  );
}

function InstagramLink() {
  return (
    <IconButton
      aria-label="Instagram"
      href="https://www.instagram.com/thehoodnewmexico/"
      target="_blank"
      rel="noopener"
    >
      <InstagramIcon sx={{ color: shades.secondary[500] }} fontSize='large' />
    </IconButton>
  );
}

function Footer() {

  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={shades.neutral[900]}>
      <Box
        width="80%"
        margin="auto"
      >

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridGap: '30px',
          columnGap: "60px",
          color: '#fff',
          '@media (max-width: 992px)': {
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto',
            columnGap: "30px",
          },
        }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '@media (max-width: 992px)': {
                gridColumnStart: '1',
                gridColumnEnd: '3',
              },
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
              <i>noun (slang) </i>&nbsp; short for "neigh•bor•hood"
              <br/>as in community • culture • barrio.
              <br/>Proudly serving the Las Cruces area since 2020.
            </Typography>
            <Box ml='-10px'>
              <FacebookLink />
              <InstagramLink />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" fontWeight="bold" mb="10px" color={shades.secondary[500]}>
              Customer Care
            </Typography>
            <Typography mb="10px"><Link underline="hover" color="inherit" href='#0'>Help Center</Link></Typography>
            <Typography mb="10px"><Link underline="hover" color="inherit" href='#0'>Track Your Order</Link></Typography>
            <Typography mb="10px"><Link underline="hover" color="inherit" href='#0'>Returns & Refunds</Link></Typography>
            <Typography mb="10px"><Link underline="hover" color="inherit" href='#0'>Privacy Policy</Link></Typography>
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
              (575) 621–0931 or<br />(575) 644–3372
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