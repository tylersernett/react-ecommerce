import React from 'react'
import { Box, Typography, IconButton, useMediaQuery, Divider } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

const importAll = (r) =>
  r.keys().reduce((accumulator, item) => {
    accumulator[item.replace("./", "")] = r(item);
    return accumulator;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets/yard", false, /\.(png|jpe?g|svg)$/)
);

const Events = () => {
  const isNonMobile = useMediaQuery("(min-width:768px)");
  return (
    <Box m="100px auto" width="80%" >
      <Typography variant='h2' textAlign='center' my='20px' color={shades.secondary[400]}>
          Events at The Yard
        </Typography>
      <Box width={isNonMobile ? '560px' : '300px'} mx='auto'>
      <Typography fontSize='1rem' >
        We know sometimes there's nothing like enjoying an evening out in the back yard, and we've designed this space with our community in mind.
        <br /><br />
        Have an event you think our space would be perfect for? Contact us and lets talk about what we can do.
        <br /><br />
      </Typography>
      </Box>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showStatus={false}
        showThumbs={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateNextIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
      >
        {Object.values(heroTextureImports).map((texture, index) => (
          <Box key={`carousel-image-${index}`}>
            <img
              src={texture}
              alt={`carousel-${index}`}
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                backgroundAttachment: "fixed",
              }}
            />

          </Box>
        ))}
      </Carousel>

    </Box>
  )
}

export default Events