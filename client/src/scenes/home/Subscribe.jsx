import { useState } from "react";
import { Box, InputBase, Divider, Typography } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { shades } from "../../theme";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      <MarkEmailReadOutlinedIcon fontSize="large" />
      <Typography variant="h3" color={shades.secondary[500]}>Subscribe To Our Newsletter</Typography>
      <Typography>
        and receive a $20 coupon for your first order when you checkout
      </Typography>

      {/* EMAIL INPUT */}
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width='75%'
        maxWidth='500px'
        backgroundColor="#F2F2F2"
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: 'black' }}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)} //useRef rather than state here?
          value={email}
        />
        <Divider color='black' sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Typography color={shades.primary[900]} sx={{ p: "10px", ":hover": { cursor: "pointer" } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Subscribe;