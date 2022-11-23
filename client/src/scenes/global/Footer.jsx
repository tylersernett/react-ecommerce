import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            REACT ECOMMERCE
          </Typography>
          <div>
          Nunc sed augue lacus viverra vitae congue eu. Eget magna fermentum iaculis eu. 
          Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. 
          Auctor eu augue ut lectus. Amet facilisis magna etiam tempor. 
          Purus semper eget duis at tellus at urna condimentum mattis. 
          Sem nulla pharetra diam sit amet nisl. Nulla facilisi etiam dignissim eget diam.
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            50 Fake Blvd, Albuquerque, NM 87109
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: fake_email@gmail.com
          </Typography>
          <Typography mb="30px">(222) 333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;