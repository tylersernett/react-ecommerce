import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

// imports all images from assets folder ... from https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
const importAll = (r) =>
  r.keys().reduce((accumulator, item) => {
    accumulator[item.replace("./", "")] = r(item);
    return accumulator;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets/heros", false, /\.(png|jpe?g|svg)$/)
);

const handleScrollToStore = () => {
  const storeElement = document.getElementById("store");
  if (storeElement) {
    const offset = storeElement.offsetTop - 80;
    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  }
};

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
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
            '&:hover':{
              backgroundColor:'rgb(0,0,0,0.5)'
            }
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
            '&:hover':{
              backgroundColor:'rgb(0,0,0,0.5)'
            }
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
          <Box
            onClick={handleScrollToStore}
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            position="absolute"
            top="46%"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
            sx={{
              cursor:'pointer',
              backgroundColor:"rgb(0, 0, 0, 0.7)",
              transition:'0.3s',
              '&:hover':{backgroundColor:'rgb(0, 0, 0, 0.8)', }
            }}
          >
            <Box>
              <Typography color={shades.secondary[200]}>NEW ITEMS</Typography>
              <Typography variant="h1">Summer Sale</Typography>
              <Typography
                fontWeight="bold"
                color={shades.secondary[300]}
                sx={{ textDecoration: "" }}
              >
                Discover More
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;